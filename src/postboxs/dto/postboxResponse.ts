import { IsNotEmpty } from "class-validator";

export class PostboxResponse{

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export class PaginatedPostboxResponse {
    items: PostboxResponse[];
    totalCount: number;
    totalPages: number;
    pageNo: number;
  
    constructor(items: PostboxResponse[], totalCount: number, totalPages: number, pageNo: number) {
        this.items = items;
        this.totalCount = totalCount;
        this.totalPages = totalPages;
        this.pageNo = pageNo;
    }
}