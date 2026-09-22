// HÜ-Domäne UE 2: Kapselung & Invarianten am Fahrzeug.
// Dein Job: die Invarianten fail-fast sichern, bis fahrzeug_test.ts grün ist.
export class Fahrzeug {
  readonly marke: string;
  private _kmStand: number;
  private _geschwindigkeit: number;
  readonly maxGeschwindigkeit: number;

  constructor(
    marke: string,
    kmStand: number,
    maxGeschwindigkeit: number,
  ) {
    // Invariante fail-fast: kmStand darf nicht negativ sein
    if (kmStand < 0) {
      throw new Error(`kmStand darf nicht negativ sein (war ${kmStand})`);
    }
    this.marke = marke;
    this._kmStand = kmStand;
    this.maxGeschwindigkeit = maxGeschwindigkeit;
    this._geschwindigkeit = 0;
  }

  // getter für kmStand und geschwindigkeit (lesen ja, schreiben nie).
  get kmStand(): number {
    return this._kmStand;
  }

  get geschwindigkeit(): number {
    return this._geschwindigkeit;
  }

  // wirft, wenn v < 0 oder v > maxGeschwindigkeit.
  setGeschwindigkeit(v: number): void {
    if (v < 0 || v > this.maxGeschwindigkeit) {
      throw new Error(
        `Geschwindigkeit ungültig: 0 <= v <= ${this.maxGeschwindigkeit} erwartet (war ${v})`,
      );
    }
    this._geschwindigkeit = v;
  }

  // erhöht kmStand um geschwindigkeit * stunden.
  fahre(stunden: number): void {
    if (stunden < 0) {
      throw new Error(`Stunden dürfen nicht negativ sein (war ${stunden})`);
    }
    this._kmStand += this._geschwindigkeit * stunden;
  }

  toString(): string {
    return `${this.marke} (${this._kmStand} km, fährt ${this._geschwindigkeit}/${this.maxGeschwindigkeit} km/h)`;
  }
}
