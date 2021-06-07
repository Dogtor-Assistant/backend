import type { IMiniReview } from 'models/Doctor';
import type { IReview } from 'models/Review';

import ReviewModel from 'models/Review';
import { ObjectID } from 'mongodb';
import { buildId } from 'utils/ids';

type ReviewInput = IReview | IMiniReview | string | ObjectID

function getId(input: ReviewInput): string {
    if (typeof input === 'string') {
        return input;
    }
    if (input instanceof ObjectID) {
        return input.toHexString();
    }

    if ('reviewId' in input && input.reviewId != null) {
        return input.reviewId;
    }

    if (input._id != null) {
        return input._id;
    }

    throw 'Uninitialized Value!';
}

export class Review {
    __typename: 'Review'
    _input: ReviewInput
    _full: Promise<IReview> | null

    constructor(input: ReviewInput) {
        this.__typename = 'Review';
        this._input = input;
        this._full = null;
    }

    id() {
        const id = getId(this._input);
        return buildId('Review', id);
    }

    async full(): Promise<IReview> {
        if (typeof this._input === 'object' && 'patientRef' in this._input) {
            return this._input;
        }

        if (this._full != null) {
            return await this._full;
        }

        const id = getId(this._input);
        const promise = ReviewModel.
            findById(id).
            then(value => {
                if (value == null) {
                    throw 'Review not found!';
                }
                return value;
            });

        this._full = promise;
        return await promise;
    }
}

export async function review(id: string | ObjectID): Promise<Review | null> {
    const value = await ReviewModel.findById(id);
    return value && new Review(value);
}
