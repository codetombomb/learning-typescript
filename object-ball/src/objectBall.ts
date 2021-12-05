type teamObject = {
    teamName: string;
    colors: string[];
    players: {
        [key: string]: {
            number: number;
            shoe: number;
            points: number;
            rebounds: number;
            assists: number;
            steals: number;
            blocks: number;
            slamDunks: number;
        }
    }
}

class GameObject {
    constructor(private home: teamObject, private away: teamObject) {
        this.home = home;
        this.away = away;
    }

    numPointsScored(playerName: string): number {
        let points: number = 0;
        if (!this.allPlayers()[playerName]) throw new Error("Player not found")
        for (const player in this.allPlayers()) {
            if (player === playerName) {
                points += this.allPlayers()[player].points
            }
        }
        return points;
    }

    shoeSize(playerName: string): number {
        let shoe: number = 0;
        if (!this.allPlayers()[playerName]) throw new Error("Player not found")
        for (const player in this.allPlayers()) {
            if (player === playerName) {
                shoe = this.allPlayers()[player].shoe
            }
        }
        return shoe;
    }

    teamColors(teamName: string): string[] {
        return this.home.teamName === teamName ? this.home.colors : this.away.colors
    }

    playerNumbers(teamName: string): number[] {
        let result: number[] = []
        let team = this.home.teamName === teamName ? this.home.players : this.away.players
        for (const player in team) {
            result.push(team[player].number)
        }
        return result
    }

    playerStats(playerName: string): object {
        return this.allPlayers()[playerName]
    }

    bigShoeRebounds(): number {
        let big: {
            name: string;
            player: {
                shoe: number;
                rebounds: number;
            };
        } = {
            name: '',
            player: {
                shoe: 0,
                rebounds: 0,
            },
        };
        for (const playerName in this.allPlayers()) {
            if (big.player.shoe < this.allPlayers()[playerName].shoe) {
                big.name = playerName;
                big.player = { ...this.allPlayers()[playerName] };
            }

        }
        return big.player.rebounds;
    }

    mostPointsScored(): any[]{
        let mostPoints: {
            scored: number;
            player: any []
        } = { scored: 0, player: [] }
        Object.entries(this.allPlayers()).forEach((player: any[]) => {
            if (player[1].points > mostPoints.scored) {
                mostPoints.scored = player[1].points;
                mostPoints.player = player;
            }
        })
        return mostPoints.player
    }

    winningTeam(): string{
      return this.addTeamPoints(this.home.players) > this.addTeamPoints(this.away.players) ? "Home" : "Away"
    }

    playerWithLongestName(): string {
        return Object.keys(this.allPlayers()).reduce((previous: string, player: string) => {
                return previous.length > player.length ? previous : player
            }
        );
    }

    //Helpers
    allPlayers() {
        return { ...this.home.players, ...this.away.players };
    }

    addTeamPoints(team: {}){
        return Object.entries(team).map((player: any[]) => {
            return player[1].points
        }).reduce((points, current) => points + current, 0)
    }


}

const homeTeam: teamObject = {
    teamName: 'Brooklyn Nets',
    colors: ['black', 'white'],
    players: {
        'Alan Anderson': {
            number: 0,
            shoe: 16,
            points: 22,
            rebounds: 12,
            assists: 12,
            steals: 3,
            blocks: 1,
            slamDunks: 1
        },
        'Reggie Evans': {
            number: 30,
            shoe: 14,
            points: 12,
            rebounds: 12,
            assists: 12,
            steals: 12,
            blocks: 12,
            slamDunks: 7
        },
        'Brook Lopez': {
            number: 11,
            shoe: 17,
            points: 17,
            rebounds: 19,
            assists: 10,
            steals: 3,
            blocks: 1,
            slamDunks: 15
        },
        'Mason Plumlee': {
            number: 1,
            shoe: 19,
            points: 26,
            rebounds: 12,
            assists: 6,
            steals: 3,
            blocks: 8,
            slamDunks: 5
        },
        'Jason Terry': {
            number: 31,
            shoe: 15,
            points: 19,
            rebounds: 2,
            assists: 2,
            steals: 4,
            blocks: 11,
            slamDunks: 1
        }
    }
}

const awayTeam = {
    teamName: 'Charlotte Hornets',
    colors: ['turquoise', 'purple'],
    players: {
        'Jeff Adrien': {
            number: 4,
            shoe: 18,
            points: 10,
            rebounds: 1,
            assists: 1,
            steals: 2,
            blocks: 7,
            slamDunks: 2
        },
        'Bismak Biyombo': {
            number: 0,
            shoe: 16,
            points: 12,
            rebounds: 4,
            assists: 7,
            steals: 7,
            blocks: 15,
            slamDunks: 10
        },
        'DeSagna Diop': {
            number: 2,
            shoe: 14,
            points: 24,
            rebounds: 12,
            assists: 12,
            steals: 4,
            blocks: 5,
            slamDunks: 5
        },
        'Ben Gordon': {
            number: 8,
            shoe: 15,
            points: 33,
            rebounds: 3,
            assists: 2,
            steals: 1,
            blocks: 1,
            slamDunks: 0
        },
        'Brendan Haywood': {
            number: 33,
            shoe: 15,
            points: 6,
            rebounds: 12,
            assists: 12,
            steals: 2,
            blocks: 5,
            slamDunks: 12
        }
    }
}

const g = new GameObject(homeTeam, awayTeam)
