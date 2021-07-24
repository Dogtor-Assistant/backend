import type { IUser } from 'models/User';

import UserModel from 'models/User';
import { ObjectID } from 'mongodb';
import { buildId } from 'utils/ids';

export type UserInput = IUser | string | ObjectID

function getId(input: UserInput): string {
    if (typeof input === 'string') {
        return input;
    }
    if (input instanceof ObjectID) {
        return input.toHexString();
    }

    if (input._id != null) {
        return input._id;
    }

    throw 'Uninitialized Value!';
}

export class User {
    __typename: 'User'
    _input: UserInput
    _full: Promise<IUser> | null

    constructor(input: UserInput) {
        this.__typename = 'User';
        this._input = input;
        this._full = null;
    }

    id() {
        const id = getId(this._input);
        return buildId('User', id);
    }

    async full(): Promise<IUser> {
        if (typeof this._input === 'object' && '_id' in this._input) {
            return this._input;
        }

        if (this._full != null) {
            return await this._full;
        }

        const id = getId(this._input);
        const promise = UserModel.
            findById(id).
            then(value => {
                if (value == null) {
                    throw 'User not found!';
                }
                return value;
            });

        this._full = promise;
        return await promise;
    }
}

export async function user(id: string | ObjectID): Promise<User | null> {
    const value = await UserModel.findById(id);
    return value && new User(value);
}
