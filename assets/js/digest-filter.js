// Фильтрация digest карточек
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const digestCards = document.querySelectorAll(".digest-card");

  if (filterButtons.length === 0 || digestCards.length === 0) {
    return; // Если нет элементов, выходим
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      // Обновляем активную кнопку
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Фильтруем карточки
      digestCards.forEach((card) => {
        if (filter === "all") {
          card.classList.remove("hidden");
        } else if (card.dataset.type === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });

      // Сохраняем выбранный фильтр в localStorage
      try {
        localStorage.setItem("digestFilter", filter);
      } catch (e) {
        // Игнорируем ошибки localStorage
      }
    });
  });

  // Восстанавливаем последний выбранный фильтр
  try {
    const savedFilter = localStorage.getItem("digestFilter");
    if (savedFilter) {
      const savedButton = document.querySelector(
        `[data-filter="${savedFilter}"]`,
      );
      if (savedButton) {
        savedButton.click();
      }
    }
  } catch (e) {
    // Игнорируем ошибки localStorage
  }
});
