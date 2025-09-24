document.addEventListener("DOMContentLoaded", function () {
  initializeFilters();
  initializeSorting();
  initializeSearch();
});

let allCranes = [];
let filteredCranes = [];

function initializeFilters() {
  const capacityFilter = document.getElementById("capacityFilter");
  const typeFilter = document.getElementById("typeFilter");

  if (capacityFilter) {
    capacityFilter.addEventListener("change", filterCranes);
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", filterCranes);
  }

  // DOM tamamen yüklendikten sonra veri yükle
  setTimeout(() => {
    loadCraneData();
  }, 100);
}

function initializeSorting() {
  const sortSelect = document.getElementById("sortSelect");

  if (sortSelect) {
    sortSelect.addEventListener("change", sortCranes);
  }
}

function initializeSearch() {
  const searchInput = document.getElementById("craneSearch");

  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterCranes, 300));
  }
}

function loadCraneData() {
  const craneCards = document.querySelectorAll("#craneList .col-lg-4");
  
  if (craneCards.length === 0) {
    console.warn("Vinç kartları bulunamadı, DOM henüz yüklenmemiş olabilir");
    return;
  }
  
  allCranes = Array.from(craneCards).map((card) => {
    const titleElement = card.querySelector(".card-title");
    const specElement = card.querySelector(".spec-item");

    if (!titleElement) {
      console.warn("Card title bulunamadı:", card);
      return null;
    }

    const crane = {
      element: card,
      name: titleElement.textContent || "",
      capacity: specElement ? extractCapacity(specElement.textContent) : 0,
      type: extractType(titleElement.textContent),
      price: 0, // Fiyat bilgisi kaldırıldı
    };
    return crane;
  }).filter(crane => crane !== null);

  filteredCranes = [...allCranes];
}

function extractCapacity(text) {
  const match = text.match(/(\d+)\s*ton/i);
  return match ? parseInt(match[1]) : 0;
}

function extractType(text) {
  if (text.toLowerCase().includes("mobil")) return "Mobil Vinç";
  if (text.toLowerCase().includes("sabit")) return "Sabit Vinç";
  return "Diğer";
}

function extractPrice(text) {
  const match = text.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function filterCranes() {
  const capacityFilter = document.getElementById("capacityFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("craneSearch");

  const selectedCapacity = capacityFilter ? capacityFilter.value : "";
  const selectedType = typeFilter ? typeFilter.value : "";
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  filteredCranes = allCranes.filter((crane) => {
    const capacityMatch =
      !selectedCapacity || crane.capacity === parseInt(selectedCapacity);
    const typeMatch = !selectedType || crane.type === selectedType;
    const searchMatch =
      !searchTerm || crane.name.toLowerCase().includes(searchTerm);

    return capacityMatch && typeMatch && searchMatch;
  });

  displayFilteredCranes();
  updateResultsCount();
}

function sortCranes() {
  const sortSelect = document.getElementById("sortSelect");
  if (!sortSelect) return;

  const sortBy = sortSelect.value;

  filteredCranes.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name, "tr");
      case "capacity":
        return b.capacity - a.capacity;
      case "type":
        return a.type.localeCompare(b.type, "tr");
      default:
        return 0;
    }
  });

  displayFilteredCranes();
}

function displayFilteredCranes() {
  const craneList = document.getElementById("craneList");
  if (!craneList) return;

  craneList.innerHTML = "";

  if (filteredCranes.length === 0) {
    showNoResultsMessage();
    return;
  }

  filteredCranes.forEach((crane) => {
    craneList.appendChild(crane.element);
  });

  animateCraneCards();
}

function showNoResultsMessage() {
  const craneList = document.getElementById("craneList");
  const noResultsDiv = document.createElement("div");
  noResultsDiv.className = "col-12 text-center py-5";
  noResultsDiv.innerHTML = `
    <div class="no-results">
      <i class="fas fa-search text-muted fa-3x mb-3"></i>
      <h4 class="text-muted">Sonuç bulunamadı</h4>
      <p class="text-muted">Arama kriterlerinize uygun vinç bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
      <button class="btn btn-outline-primary" onclick="clearFilters()">Filtreleri Temizle</button>
    </div>
  `;

  craneList.appendChild(noResultsDiv);
}

function updateResultsCount() {
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.textContent = `${filteredCranes.length} vinç bulundu`;
  }
}

function clearFilters() {
  const capacityFilter = document.getElementById("capacityFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("craneSearch");

  if (capacityFilter) capacityFilter.value = "";
  if (typeFilter) typeFilter.value = "";
  if (searchInput) searchInput.value = "";

  filteredCranes = [...allCranes];
  displayFilteredCranes();
  updateResultsCount();
}

function animateCraneCards() {
  const cards = document.querySelectorAll("#craneList .col-lg-4");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function exportResults() {
  const results = filteredCranes.map((crane) => ({
    name: crane.name,
    capacity: crane.capacity,
    type: crane.type,
  }));

  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.download = "vinc-sonuclari.json";
  link.click();
}

function shareResults() {
  if (navigator.share) {
    navigator.share({
      title: "Vinç Kiralama Sonuçları",
      text: `${filteredCranes.length} vinç modeli bulundu.`,
      url: window.location.href,
    });
  } else {
    const shareText = `${filteredCranes.length} vinç modeli bulundu. ${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showNotification("Sonuçlar panoya kopyalandı!", "success");
    });
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

function toggleViewMode() {
  const craneList = document.getElementById("craneList");
  const viewModeBtn = document.getElementById("viewModeBtn");

  if (craneList && craneList.classList) {
    if (craneList.classList.contains("grid-view")) {
      craneList.classList.remove("grid-view");
      craneList.classList.add("list-view");
      if (viewModeBtn) {
        viewModeBtn.innerHTML = '<i class="fas fa-th"></i> Grid Görünüm';
      }
    } else {
      craneList.classList.remove("list-view");
      craneList.classList.add("grid-view");
      if (viewModeBtn) {
        viewModeBtn.innerHTML = '<i class="fas fa-list"></i> Liste Görünüm';
      }
    }
  }
}

window.clearFilters = clearFilters;
window.exportResults = exportResults;
window.shareResults = shareResults;
window.toggleViewMode = toggleViewMode;
