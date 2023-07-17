package com.DDD.service;


import com.DDD.dto.MessageDTO;
import com.DDD.entity.Member;
import com.DDD.entity.Message;
import com.DDD.repository.MemberRepository;
import com.DDD.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.lang.Long.parseLong;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    // 메세지 보내기
    public boolean sendMessage(String senderId, String receiverId, String title, String contents) {
        Optional<Member> member = memberRepository.findById(parseLong(senderId));
        Optional<Member> member1 = memberRepository.findById(parseLong(receiverId));

        Member senderMember = member.get();
        Member receiverMember = member1.get();

        Message message = new Message();
        message.setSender(senderMember);
        message.setReceiver(receiverMember);
        message.setMessageTitle(title);
        message.setMessageContents(contents);
        message.setMessageDate(LocalDateTime.now());

        messageRepository.save(message);
        return  true;
    }

    // 받은메세지 리스트
    public List<MessageDTO> receiveMessageList(String receiverId) {
        List<MessageDTO> messageDTOS = new ArrayList<>();
        List<Message> messages = messageRepository.findAllByReceiverId(Long.parseLong(receiverId));

        for(Message e : messages) {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setTitle(e.getMessageTitle());
            messageDTO.setSenderId(String.valueOf(e.getSender().getId()));
            messageDTO.setSenderNickname(e.getSender().getNickname());
            messageDTO.setMessageDate(e.getMessageDate());

            messageDTOS.add(messageDTO);
        }
        return messageDTOS;
    }


}
