import { PostboxResponse } from "../dto/postboxResponse";
import { PostBox } from "../postbox.entity";


export class PostBoxMapper {

    static toDto(postBox: PostBox): PostboxResponse {
        const postBoxDto = new PostboxResponse(postBox.id, postBox.name, postBox.email);
        postBoxDto.id = postBox.id;
        postBoxDto.name = postBox.name;       

        return postBoxDto;
    }

  
}