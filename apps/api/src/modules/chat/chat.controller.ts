import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("chats")
export class ChatController {
  @Get()
  list() {
    return [{ id: "chat-demo", listingId: "lst-camry-2018", unread: 2, lastMessage: "Salam" }];
  }

  @Post()
  create(@Body() body: { listingId: string; sellerId: string }) {
    return { id: `chat-${body.listingId}`, participants: ["current-user", body.sellerId], listingId: body.listingId };
  }

  @Post(":id/messages")
  send(@Param("id") id: string, @Body() body: { text?: string; location?: unknown; listingId?: string }) {
    return { id: `msg-${Date.now()}`, chatId: id, ...body, delivered: true };
  }
}
