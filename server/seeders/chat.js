import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createSingleChat=async(chatsCount)=>{
    try{
        const users= await User.find().select("_id");

        const chatsPromise=[];
        for (let i=0;i<users.length;i++)
        {
            for(let j=i+1;j<users.length;j++){
                chatsPromise.push(
                    Chat.create({
                        name:faker.lorem.words(2),
                        members:[users[i],users[j]],
                    })
                );
            }
        }
        await Promise.all(chatsPromise);
        console.log("Single Chats Created Successfully");
        process.exit(1);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};

const createGroupChat=async (chatsCount)=>{
    try{
        const users= await User.find().select("_id");

        const chatPromise=[];
        for(let i=0;i<chatsCount;i++){
            const numMembers=simpleFaker.number.int({min:3,max:users.length});
            const members=[];

            for(let i=0;i<numMembers;i++){
                const randomIndex= Math.floor(Math.random()*users.length);
                const randomUser=users[randomIndex];
                if(!members.includes(randomUser._id)){
                    members.push(randomUser._id);
                }
            }
            const chat=Chat.create({
                groupChat:true,
                name:faker.lorem.words(2),
                members:members,
                creator:members[0],
            })
            chatPromise.push(chat);
        }
        await Promise.all(chatPromise);
        console.log("Group Chats Created Successfully");
        process.exit(1);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};

const createmessages=async(chatsCount,messagesPerChat)=>{
    try{
        const chats= await Chat.find().select("_id");       
        const users= await User.find().select("_id");
        const messagePromise=[];
        for(const chat of chats){
            for(let i=0;i<messagesPerChat;i++){
                const randomIndex= Math.floor(Math.random()*chat.members.length);
                const sender=chat.members[randomIndex];
                const message=Message.create({
                    chat:chat._id,
                    sender:sender,
                    content:faker.lorem.sentence(),
                });
                messagePromise.push(message);
            }
        }
        await Promise.all(messagePromise);
        console.log("Messages Created Successfully");
        process.exit(1);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};


export {createSingleChat,createGroupChat};