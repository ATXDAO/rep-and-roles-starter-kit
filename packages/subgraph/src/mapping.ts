import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  YourContract,
  GreetingChange,
  SendMessage
} from "../generated/YourContract/YourContract";

import {
  Mint
} from "../generated/ReputationTokensInstance/ReputationTokensInstance";

import { Greeting, Sender, Messenger, Receiver, Message } from "../generated/schema";

export function handleGreetingChange(event: GreetingChange): void {
  let senderString = event.params.greetingSetter.toHexString();

  let sender = Sender.load(senderString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.greetingSetter;
    sender.createdAt = event.block.timestamp;
    sender.greetingCount = BigInt.fromI32(1);
  } else {
    sender.greetingCount = sender.greetingCount.plus(BigInt.fromI32(1));
  }

  let greeting = new Greeting(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  greeting.greeting = event.params.newGreeting;
  greeting.sender = senderString;
  greeting.premium = event.params.premium;
  greeting.value = event.params.value;
  greeting.createdAt = event.block.timestamp;
  greeting.transactionHash = event.transaction.hash.toHex();

  greeting.save();
  sender.save();
}

export function handleMint(event: Mint): void {
  console.log(event.params.tokens);

}

export function handleMessage(event: SendMessage): void {
  let messengerString = event.params._from.toHexString();
  let receiverString = event.params._to.toHexString();

  let messenger = Messenger.load(messengerString);

  if (messenger === null) {
    messenger = new Messenger(messengerString);
    messenger.address = event.params._from;
    messenger.createdAt = event.block.timestamp;
    messenger.messageCount = BigInt.fromI32(1);
  } else {
    messenger.messageCount = messenger.messageCount.plus(BigInt.fromI32(1));
  }

  let receiver = Receiver.load(receiverString);

  if (receiver === null) {
    receiver = new Receiver(receiverString);
    receiver.address = event.params._from;
    receiver.createdAt = event.block.timestamp;
    receiver.messageCount = BigInt.fromI32(1);
  } else {
    receiver.messageCount = receiver.messageCount.plus(BigInt.fromI32(1));
  }

  let message = new Message(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  message.message = event.params.message;
  message._from = messengerString;
  message._to = receiverString;
  message.createdAt = event.block.timestamp;
  message.transactionHash = event.transaction.hash.toHex();

  receiver.save();
  messenger.save();
  message.save();
}