package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.MessageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessagesRepository extends JpaRepository<MessageData, Long> {
    List<MessageData> findAllByReceiverNameAndAndSenderName(String receiverName, String senderName);
    List<MessageData> findAllByReceiverName(String receiverName);
}
