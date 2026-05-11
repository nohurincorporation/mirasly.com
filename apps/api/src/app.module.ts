import { Module } from "@nestjs/common";
import { AdminModule } from "./modules/admin/admin.module";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ChatModule } from "./modules/chat/chat.module";
import { CommerceModule } from "./modules/commerce/commerce.module";
import { EngagementModule } from "./modules/engagement/engagement.module";
import { ListingsModule } from "./modules/listings/listings.module";
import { SearchModule } from "./modules/search/search.module";

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    ListingsModule,
    SearchModule,
    EngagementModule,
    ChatModule,
    CommerceModule,
    AiModule,
    AdminModule,
  ],
})
export class AppModule {}
