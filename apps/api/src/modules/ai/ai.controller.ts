import { Body, Controller, Post } from "@nestjs/common";
import { MockAiProvider } from "./mock-ai.provider.js";

@Controller("ai")
export class AiController {
  private readonly provider = new MockAiProvider();

  @Post("suggest-category")
  suggestCategory(@Body() body: unknown) {
    return this.provider.suggestCategory(body as never);
  }

  @Post("generate-description")
  generateDescription(@Body() body: unknown) {
    return this.provider.generateListingCopy(body as never);
  }

  @Post("translate")
  translate(@Body() body: unknown) {
    return this.provider.translateText(body as never);
  }

  @Post("moderate")
  moderate(@Body() body: unknown) {
    return this.provider.moderateContent(body as never);
  }
}
