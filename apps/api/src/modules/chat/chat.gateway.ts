import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ namespace: "/chats", cors: true })
export class ChatGateway {
  @SubscribeMessage("typing")
  typing(_: unknown, payload: { chatId: string; userId: string }) {
    return { event: "typing", data: payload };
  }

  @SubscribeMessage("read")
  read(_: unknown, payload: { chatId: string; messageIds: string[] }) {
    return { event: "read", data: payload };
  }
}
