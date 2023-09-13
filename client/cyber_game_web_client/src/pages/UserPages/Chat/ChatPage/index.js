import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.scss";
import CircleLoader from "../../../../components/CircleLoader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../slices/user.slice";
import { format } from "date-fns";
import TimeUtils from "../../../../utils/time_utils";
import ROLE from "../../../../enums/role.enum";
import ProfileIcon from "../../../../assets/icons/ic_profile_inactive.svg";
import SendIcon from "../../../../assets/icons/ic_send.svg";

const ChatPage = () => {
  const user = useSelector(selectUser);

  const chatChannel = useParams();

  const [draftText, setDraftText] = useState("");

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "What are you doing?",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1694368788000,
    },
    {
      _id: 1,
      text: "What are you doing?",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1694368788000,
    },
    {
      _id: 1,
      text: "What are you doing?",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.user,
      },
      sending: false,
      createdAt: 1694368788000,
    },
    {
      _id: 1,
      text: "Doing?",
      user: {
        userId: "CUO",
        userName: "Võ Văn Nam",
        avatar: null,
        role: ROLE.user,
      },
      sending: false,
      createdAt: 1694368788000,
    },
    {
      _id: 1,
      text: "What are you doing?",
      user: {
        userId: "CU",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1694368788000,
    },
    {
      _id: 1,
      text: "- Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản, đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản, tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân chia có thể không thống nhất giữa những người đọc: có người chia theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý nhỏ là một đoạn.",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1693825968000,
    },
    {
      _id: 1,
      text: "- Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản, đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản, tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân chia có thể không thống nhất giữa những người đọc: có người chia theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý nhỏ là một đoạn.",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1693825968000,
    },
    {
      _id: 1,
      text: "- Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản, đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản, tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân chia có thể không thống nhất giữa những người đọc: có người chia theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý nhỏ là một đoạn.",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1693825968000,
    },
    {
      _id: 1,
      text: "- Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản, đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản, tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân chia có thể không thống nhất giữa những người đọc: có người chia theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý nhỏ là một đoạn.",
      user: {
        userId: "CUONG",
        userName: "Nguyễn Lương Cường",
        avatar: null,
        role: ROLE.admin,
      },
      sending: false,
      createdAt: 1693825968000,
    },
  ]);

  const currentTimestamp = useRef(new Date().getTime());

  useEffect(() => {
    // dựa vào userId để lấy chat
    // trả về tin nhắn theo format

    // lưu theo dạng dưới, trả về thì dựa vào Id lấy các thông số còn lại
    /* 
      {
        _id: id tin nhắn
        text: "String"
        userId: "RE"
        createdAt: 1656554545,
      }
    */
    // Lấy cả current time từ server. Không lấy time ở người dùng
    // sắp xếp mảng messages từ sớm nhất đến cũ nhất ( tin nhắn mới nhất ở đầu mảng )

    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight; // Cuộn xuống dưới cùng
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const onChangeDraft = (event) => {
    setDraftText(event.target.value);
  };

  const sendMessage = () => {
    const finalDraft = draftText.trim();

    if (!finalDraft) {
      return;
    }

    const messageToSend = {
      text: finalDraft,
      userId: user.userId,
      sendTo: chatChannel,
    };

    // send to server
    setMessages([
      {
        text: finalDraft,
        user: {
          userId: user.userId,
          avatar: user.avatar,
          userName: user.userName,
          role: user.role,
        },
        sending: true,
        createdAt: Date.now(),
      },
      ...messages,
    ]);

    setDraftText("");
  };

  const MyMessage = ({ prevMessage, currentMessage, nextMessage }) => {
    let createdDate = new Date(currentMessage.createdAt);

    let largeBorderRadius = 20;
    let smallBorderRadius = 4;

    let haveDateViewAbove =
      !nextMessage ||
      !TimeUtils.haveSameDate(currentMessage.createdAt, nextMessage?.createdAt);

    let haveDateViewBellow = !TimeUtils.haveSameDate(
      currentMessage.createdAt,
      prevMessage?.createdAt
    );

    const isNextMessageSameUserId =
      nextMessage?.user.userId === currentMessage.user.userId;

    const isPrevMessageSameUserId =
      prevMessage?.user.userId === currentMessage.user.userId;

    let borderTopRightRadius =
      isNextMessageSameUserId && !haveDateViewAbove
        ? smallBorderRadius
        : largeBorderRadius;

    let borderBottomRightRadius =
      isPrevMessageSameUserId && !haveDateViewBellow
        ? smallBorderRadius
        : largeBorderRadius;

    return (
      <div
        className={styles.myMessage}
        style={{ marginTop: isNextMessageSameUserId ? 2 : 12 }}
      >
        {haveDateViewAbove && (
          <DateStringView
            text={TimeUtils.formatDate(
              currentMessage.createdAt,
              currentTimestamp.current
            )}
          />
        )}
        <div className={styles.myTextMessageWrapper}>
          {currentMessage.sending ? (
            <CircleLoader size="15px" strokeWidth="1px" color="transparent" />
          ) : (
            <p className={styles.formattedTime}>
              {format(createdDate, "HH:mm")}
            </p>
          )}
          <p
            className={styles.textMessage}
            style={{
              borderTopLeftRadius: largeBorderRadius,
              borderTopRightRadius,
              borderBottomLeftRadius: largeBorderRadius,
              borderBottomRightRadius,
            }}
          >
            {currentMessage.text}
          </p>
        </div>
      </div>
    );
  };

  const PeopleMessage = ({ prevMessage, currentMessage, nextMessage }) => {
    let createdDate = new Date(currentMessage.createdAt);

    let largeBorderRadius = 20;
    let smallBorderRadius = 4;

    let haveDateViewAbove =
      !nextMessage ||
      !TimeUtils.haveSameDate(currentMessage.createdAt, nextMessage?.createdAt);

    let haveDateViewBellow = !TimeUtils.haveSameDate(
      currentMessage.createdAt,
      prevMessage?.createdAt
    );

    const isNextMessageSameUserId =
      nextMessage?.user.userId === currentMessage.user.userId;

    const isPrevMessageSameUserId =
      prevMessage?.user.userId === currentMessage.user.userId;

    let borderTopLeftRadius =
      isNextMessageSameUserId && !haveDateViewAbove
        ? smallBorderRadius
        : largeBorderRadius;

    let borderBottomLeftRadius =
      isPrevMessageSameUserId && !haveDateViewBellow
        ? smallBorderRadius
        : largeBorderRadius;

    let shouldShowAvatar = !isPrevMessageSameUserId || haveDateViewBellow;
    let shouldShowName = !isNextMessageSameUserId || haveDateViewAbove;
    let shouldShowRole =
      currentMessage.user.role === ROLE.admin ||
      currentMessage.user.role === ROLE.moderator;

    return (
      <div
        className={styles.myMessage}
        style={{ marginTop: isNextMessageSameUserId ? 2 : 12 }}
      >
        {haveDateViewAbove && (
          <DateStringView
            text={TimeUtils.formatDate(
              currentMessage.createdAt,
              currentTimestamp.current
            )}
          />
        )}
        {shouldShowName && (
          <div className={styles.userNameAndRoleWarper}>
            {shouldShowRole && <span className={styles.role}>ADMIN</span>}
            <span>{currentMessage.user.userName ?? "..."}</span>
          </div>
        )}
        <div className={styles.peopleTextMessageWrapper}>
          {currentMessage.sending ? (
            <CircleLoader size="15px" strokeWidth="1px" color="transparent" />
          ) : (
            <p className={styles.formattedTime}>
              {format(createdDate, "HH:mm")}
            </p>
          )}
          <p
            className={styles.textMessage}
            style={{
              borderTopLeftRadius,
              borderTopRightRadius: largeBorderRadius,
              borderBottomLeftRadius,
              borderBottomRightRadius: largeBorderRadius,
              marginLeft: shouldShowAvatar ? 0 : 44,
            }}
          >
            {currentMessage.text}
          </p>
          {shouldShowAvatar && (
            <div className={styles.avatarWarper}>
              <button className={styles.avatarBackground} onClick={() => {}}>
                <img
                  alt=""
                  src={currentMessage.user.avatar ?? ProfileIcon}
                  className={
                    currentMessage.user.avatar
                      ? styles.userWithAvatar
                      : styles.userWithoutAvatar
                  }
                />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const DateStringView = ({ text }) => {
    return <div className={styles.dateText}>{text}</div>;
  };

  return (
    <div id="scrollableDiv" className={styles.root}>
      <div className={styles.chatTable}>
        {messages.map((message, index) => {
          if (message.user.userId === user.userId) {
            return (
              <MyMessage
                prevMessage={index > 0 ? messages[index - 1] : null}
                currentMessage={message}
                nextMessage={
                  index < messages.length - 1 ? messages[index + 1] : null
                }
              />
            );
          } else {
            return (
              <PeopleMessage
                prevMessage={index > 0 ? messages[index - 1] : null}
                currentMessage={message}
                nextMessage={
                  index < messages.length - 1 ? messages[index + 1] : null
                }
              />
            );
          }
        })}
      </div>
      <span className={styles.chatBar}>
        <input
          type="text"
          className={styles.inputText}
          aria-invalid="false"
          placeholder="Nhập tin nhắn"
          autoCorrect="off"
          maxLength={200}
          value={draftText}
          onChange={onChangeDraft}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!draftText.trim()}
        >
          <img src={SendIcon} sizes="24px" alt="" />
        </button>
      </span>
    </div>
  );
};

export default ChatPage;
