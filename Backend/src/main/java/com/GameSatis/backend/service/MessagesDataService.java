package com.GameSatis.backend.service;

import com.GameSatis.backend.model.MessageData;
import com.GameSatis.backend.model.UserModel;
import com.GameSatis.backend.repository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessagesDataService {
    @Autowired
    private MessagesRepository messagesRepository;

    public MessageData saveMessage(MessageData messageData){
        MessageData messageToSave = new MessageData();

        messageToSave.setMessage(messageData.getMessage());
        messageToSave.setDate(messageData.getDate());
        messageToSave.setReceiverName(messageData.getReceiverName());
        messageToSave.setSenderName(messageData.getSenderName());
        messageToSave.setReceiverName(messageData.getReceiverName());
        MessageData finalForm = messagesRepository.save(messageToSave);
        messageToSave.setId(finalForm.getId());
        return messageToSave;
    }

    public List<MessageData> getAllMessages(String receiverName, String senderName)
    {
        List<MessageData> messages = new ArrayList<>();

        if(receiverName.equals("CHATROOM")){
            messages.addAll(messagesRepository.findAllByReceiverName("CHATROOM"));
        }
        else{
            messages = (List<MessageData>) messagesRepository
                    .findAllByReceiverNameAndAndSenderName(receiverName, senderName);
            messages.addAll(messagesRepository.findAllByReceiverNameAndAndSenderName(senderName, receiverName));
        }
        return messages;
    }
}
