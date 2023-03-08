import Address from '@/models/dao/Address';
import Coordinate from '@/models/dao/Coordinate';

/**
 * Die Klasse Station kapselt eine Tankstelle.
 * Die Klasse ist unveränderlich.
 * Preise werden als -1 gespeichert, wenn sie nicht verfügbar sind.
 * 
 * @author Tim
 */
export default class Station {

    private _id: string;
    private _name: string;
    private _brand: string;

    private _address: Address;
    private _coordinate: Coordinate;

    private _isOpen: boolean;
    private _dieselPrice: number;
    private _e5Price: number;
    private _e10Price: number;

    private _isFavorite: boolean;

    constructor(id: string, name: string, brand: string, address: Address, coordinate: Coordinate,
                isOpen: boolean, dieselPrice: number | boolean, e5Price: number | boolean, e10Price: number | boolean) {
        this._id = id;
        this._name = name;
        this._brand = brand;
        this._address = address;
        this._coordinate = coordinate;
        this._isOpen = isOpen;

        this._dieselPrice = dieselPrice === false ? -1 : dieselPrice as number;
        this._e5Price = e5Price === false ? -1 : e5Price as number;
        this._e10Price = e10Price === false ? -1 : e10Price as number;

        this._isFavorite = false;
    }
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get brand(): string {
        return this._brand;
    }

    get address(): Address {
        return this._address;
    }

    get coordinate(): Coordinate {
        return this._coordinate;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    get dieselPrice(): number {
        return this._dieselPrice;
    }

    get e5Price(): number {
        return this._e5Price;
    }

    get e10Price(): number {
        return this._e10Price;
    }

    get isFavorite(): boolean {
        return this._isFavorite;
    }

    set isFavorite(value: boolean) {
        this._isFavorite = value;
    }
}