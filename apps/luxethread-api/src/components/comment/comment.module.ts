import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import CommentSchema from '../../schemas/Comment.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Member } from '../../libs/DTO/member/member';
import { MemberModule } from '../member/member.module';
import { View } from '../../libs/DTO/view/view';
import { ViewModule } from '../view/view.module';
import { Property } from '../../libs/DTO/property/property';
import { PropertyModule } from '../property/property.module';
import { BoardArticleModule } from '../board-article/board-article.module';

@Module({
        imports: [
            MongooseModule.forFeature([
                {
                    name: 'Comment',
                    schema: CommentSchema,
                },
            ]),
            AuthModule,
            MemberModule,
            PropertyModule,
            BoardArticleModule,
          ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
