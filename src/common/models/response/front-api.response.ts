export enum FrontResponseStatus {
    STATUS_SUCCESS = 'success',
    STATUS_FAIL = 'fail',
}

export class FrontApiResponse {
    constructor(
        public status: 'success' | 'fail',
        public message = '',
        public result = null,
    ) {}
}
