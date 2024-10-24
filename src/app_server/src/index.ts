import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    hello(): string {
        return 'world!';
    }
}