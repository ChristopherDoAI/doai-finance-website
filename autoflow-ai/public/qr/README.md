# QR Code Assets

## meet-card.svg
Generic QR for the business card. Points to:
```
https://doaisystems.co.uk/meet?utm_campaign=GENERIC&utm_source=card&utm_medium=qr
```

## Generating per-event variants
Change `utm_campaign` to the event name (no spaces, e.g. `SCALE_2026` or `BIZX_APR`). No code change needed.

One-shot generation command (run from repo root, requires Node):
```bash
node -e "
const QRCode = require('qrcode');
const fs = require('fs');
const campaign = 'SCALE_2026';  // change this
const url = \`https://doaisystems.co.uk/meet?utm_campaign=\${campaign}&utm_source=card&utm_medium=qr\`;
QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 2, color: { dark: '#0D654A', light: '#FFFFFF' } }, (err, svg) => {
  fs.writeFileSync(\`public/qr/meet-card-\${campaign}.svg\`, svg);
  console.log('done');
});
"
```

You need `qrcode` installed temporarily: `npm install --save-dev qrcode` then `npm uninstall qrcode` after.

Print at 2.5cm x 2.5cm minimum. Test with at least two phone cameras before printing a batch.
