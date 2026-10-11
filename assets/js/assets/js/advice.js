
/* ==========================================
   GÓC LỚP 12 — GÓC HỌC SINH
   Tự động phản hồi và gợi ý giải pháp
   File: assets/js/advice.js
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-message-form");
  const topicSelect = document.getElementById("student-topic");
  const messageInput = document.getElementById("student-message");
  const resultBox = document.getElementById("advice-result");
  const resultTitle = document.getElementById("advice-title");
  const resultText = document.getElementById("advice-text");
  const resultAction = document.getElementById("advice-action");
  const statusMessage = document.getElementById("form-status");

  // Kiểm tra các thành phần của biểu mẫu.
  if (!form || !topicSelect || !messageInput || !resultBox) {
    console.warn(
      "Góc học sinh: Chưa tìm thấy đầy đủ biểu mẫu. " +
      "Hãy kiểm tra ID trong goc-hoc-sinh.html."
    );
    return;
  }

  const adviceLibrary = {
    study: {
      title: "📚 Mình cùng gỡ rối chuyện học tập nhé!",
      reply:
        "Áp lực học tập ở lớp 12 có thể khiến bạn cảm thấy mệt mỏi. " +
        "Bạn không cần giải quyết mọi thứ cùng một lúc, và kết quả một bài kiểm tra " +
        "không quyết định toàn bộ giá trị của bạn.",
      action:
        "Hãy viết ra 3 việc học đang khiến bạn lo nhất. Chọn một việc nhỏ có thể " +
        "làm trong 15–20 phút, hoàn thành nó rồi nghỉ ngắn. Nếu kiến thức bị hổng, " +
        "hãy nhờ giáo viên hoặc bạn bè giải thích từng phần."
    },

    mind: {
      title: "💙 Cảm xúc của bạn cũng đáng được quan tâm",
      reply:
        "Cảm thấy căng thẳng, lo lắng hoặc mất động lực không có nghĩa là bạn yếu đuối. " +
        "Bạn không cần phải lúc nào cũng tỏ ra ổn. Hãy cho mình thời gian để nhận biết " +
        "điều gì đang khiến bạn nặng lòng.",
      action:
        "Thử tạm dừng việc đang làm, hít thở chậm và ghi lại điều đang khiến bạn lo lắng. " +
        "Bạn có thể chia sẻ với người lớn đáng tin cậy, giáo viên chủ nhiệm hoặc chuyên viên " +
        "tâm lý học đường nếu tình trạng kéo dài hoặc ảnh hưởng đến sinh hoạt."
    },

    future: {
      title: "🌱 Tương lai không cần được quyết định trong một ngày",
      reply:
        "Việc chọn ngành, chọn trường hay định hướng nghề nghiệp có thể khiến bạn bối rối. " +
        "Không phải ai cũng biết mình muốn gì ngay từ đầu. Bạn được phép tìm hiểu, đặt câu hỏi " +
        "và điều chỉnh lựa chọn khi có thêm thông tin.",
      action:
        "Hãy ghi lại 3 điều bạn thích, 3 môn học hoặc kỹ năng bạn có hứng thú, rồi tìm hiểu " +
        "một vài ngành liên quan. Tra cứu yêu cầu tuyển sinh từ nguồn chính thức và trò chuyện " +
        "với thầy cô, gia đình hoặc người đang học ngành đó."
    },

    family: {
      title: "🏡 Bạn xứng đáng được lắng nghe",
      reply:
        "Khi kỳ vọng của gia đình khác với mong muốn của bản thân, bạn có thể cảm thấy khó xử. " +
        "Cảm xúc và nguyện vọng của bạn cũng quan trọng, kể cả khi hai bên chưa đồng ý với nhau.",
      action:
        "Hãy chọn lúc mọi người bình tĩnh để nói về điều bạn đang lo, điều bạn mong muốn và " +
        "sự giúp đỡ bạn cần. Dùng những câu bắt đầu bằng “Con cảm thấy…” để giải thích rõ hơn. " +
        "Nếu khó nói chuyện trực tiếp, hãy nhờ một người lớn đáng tin cậy hỗ trợ."
    },

    friends: {
      title: "🤝 Bạn không cần phải làm hài lòng tất cả mọi người",
      reply:
        "Mâu thuẫn với bạn bè hoặc cảm giác bị so sánh có thể làm bạn buồn. Bạn có quyền có " +
        "quan điểm riêng, đặt giới hạn và tìm những mối quan hệ khiến mình cảm thấy được tôn trọng.",
      action:
        "Nếu có hiểu lầm, hãy chọn thời điểm phù hợp để nói chuyện bình tĩnh và lắng nghe nhau. " +
        "Nếu ai đó liên tục xúc phạm, đe dọa hoặc bắt nạt bạn, hãy tìm sự hỗ trợ từ giáo viên " +
        "hoặc người lớn đáng tin cậy."
    },

    other: {
      title: "🌻 Cảm ơn bạn đã chia sẻ",
      reply:
        "Việc diễn đạt những điều khiến mình bận tâm đôi khi đã là một bước khởi đầu đáng quý. " +
        "Bạn không cần phải tự tìm ra lời giải cho tất cả vấn đề ngay lập tức.",
      action:
        "Hãy thử xác định điều gì đang nằm trong khả năng kiểm soát của bạn, rồi chọn một bước " +
        "nhỏ để bắt đầu. Khi cần, hãy nói chuyện với người mà bạn cảm thấy an toàn và tin tưởng."
    }
  };

  function showStatus(message, isError = false) {
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.classList.toggle("form-error", isError);
    statusMessage.classList.toggle("form-success", !isError);
  }

  function createPersonalizedReply(topic, message) {
    const base = adviceLibrary[topic] || adviceLibrary.other;
    const normalized = message.toLocaleLowerCase("vi");

    let extra = "";

    if (
      normalized.includes("thi") ||
      normalized.includes("điểm") ||
      normalized.includes("kiểm tra") ||
      normalized.includes("đề")
    ) {
      extra =
        " Với chuyện thi cử và điểm số, hãy tập trung vào phần bạn có thể cải thiện " +
        "thay vì tự trách mình vì những điều đã qua.";
    } else if (
      normalized.includes("mất ngủ") ||
      normalized.includes("mệt mỏi") ||
      normalized.includes("kiệt sức")
    ) {
      extra =
        " Đừng quên dành thời gian nghỉ ngơi và duy trì sinh hoạt đều đặn. " +
        "Nếu tình trạng này kéo dài hoặc ảnh hưởng đáng kể đến cuộc sống, hãy tìm người lớn " +
        "đáng tin cậy hoặc chuyên viên phù hợp để được hỗ trợ.";
    } else if (
      normalized.includes("không biết") ||
      normalized.includes("bối rối") ||
      normalized.includes("không thể quyết định")
    ) {
      extra =
        " Khi chưa biết nên bắt đầu từ đâu, bạn có thể liệt kê các lựa chọn và tìm thêm thông tin " +
        "từng bước. Chưa có đáp án ngay lúc này cũng không sao.";
    }

    return {
      title: base.title,
      reply: base.reply + extra,
      action: base.action
    };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const topic = topicSelect.value;
    const message = messageInput.value.trim();

    if (!message) {
      showStatus("Bạn hãy viết vài dòng chia sẻ trước nhé.", true);
      messageInput.focus();
      return;
    }

    if (message.length < 5) {
      showStatus(
        "Bạn hãy chia sẻ thêm một chút để dễ chọn lời khuyên phù hợp nhé.",
        true
      );
      messageInput.focus();
      return;
    }

    if (message.length > 2000) {
      showStatus("Tin nhắn tối đa 2.000 ký tự nhé.", true);
      messageInput.focus();
      return;
    }

    const advice = createPersonalizedReply(topic, message);

    // Dùng textContent để hiển thị văn bản an toàn.
    const titleElement =
      resultTitle || resultBox.querySelector("#advice-title");
    const textElement =
      resultText || resultBox.querySelector("#advice-text");
    const actionElement =
      resultAction || resultBox.querySelector("#advice-action");

    if (titleElement) titleElement.textContent = advice.title;
    if (textElement) textElement.textContent = advice.reply;
    if (actionElement) actionElement.textContent = advice.action;

    resultBox.hidden = false;
    resultBox.setAttribute("aria-live", "polite");

    showStatus("Đã tạo lời động viên và gợi ý dành cho bạn.");

    resultBox.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  });

  // Xóa kết quả khi bắt đầu viết chia sẻ mới.
  messageInput.addEventListener("input", () => {
    if (statusMessage) statusMessage.textContent = "";
  });
});
