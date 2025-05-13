
function interpretColor(rgb) {
  const isClose = (a, b, tolerance = 25) => Math.abs(a - b) <= tolerance;

  if (isClose(rgb.r, 170) && isClose(rgb.g, 90) && isClose(rgb.b, 60)) {
    return "Sangat Layak untuk Konsumsi";
  } else if (isClose(rgb.r, 240) && isClose(rgb.g, 150) && isClose(rgb.b, 100)) {
    return "Batas Kelayakan Konsumsi";
  } else if (isClose(rgb.r, 255) && isClose(rgb.g, 255) && isClose(rgb.b, 100)) {
    return "Tidak Layak Konsumsi";
  } else {
    return "Tidak Dikenali";
  }
}

function getPriceByQuality(quality) {
  switch (quality) {
    case "Sangat Layak untuk Konsumsi": return "Rp 15.000";
    case "Batas Kelayakan Konsumsi": return "Rp 12.000";
    case "Tidak Layak Konsumsi": return "Rp 6.000";
    default: return "Harga tidak tersedia";
  }
}

function updateDisplay(rgb) {
  const quality = interpretColor(rgb);
  const price = getPriceByQuality(quality);
  document.getElementById("quality").innerText = "Kualitas: " + quality;
  document.getElementById("price").innerText = "Harga: " + price;
}

function extractRGBFromQR(text) {
  try {
    const rgb = JSON.parse(text);
    if (rgb.r !== undefined && rgb.g !== undefined && rgb.b !== undefined) {
      updateDisplay(rgb);
    }
  } catch (e) {
    document.getElementById("quality").innerText = "Format QR tidak sesuai.";
  }
}

const html5QrCode = new Html5Qrcode("reader");
Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        html5QrCode.stop();
        extractRGBFromQR(decodedText);
      }
    );
  }
}).catch(err => {
  document.getElementById("quality").innerText = "Error: " + err;
});

function generateQR() {
  const r = parseInt(document.getElementById("r").value);
  const g = parseInt(document.getElementById("g").value);
  const b = parseInt(document.getElementById("b").value);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    alert("Harap masukkan nilai RGB yang valid (0-255)");
    return;
  }

  const qr = new QRious({
    element: document.getElementById("qrCanvas"),
    size: 200,
    value: JSON.stringify({ r, g, b })
  });
}
