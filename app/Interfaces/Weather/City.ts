export class City {
    id: number;
    name: string;
    country: string;
    population: number;
    timezone: number;

    constructor(id?: number, name?: string, country?: string, population?: number, timezone?: number) {
        this.id = id || 0;
        this.name = name || "";
        this.country = country || "";
        this.population = population || 0;
        this.timezone = timezone || 0;
    }
}