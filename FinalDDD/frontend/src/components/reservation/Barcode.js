import JsBarcode from 'jsbarcode';
import { useEffect, useState } from 'react';

const TicketBarcode = ({ visitDate, id }) => {
    const [bcImgUrl, setBcImgUrl] = useState('');


  const createBarcodeNm = (visitDate, id) => {
    const idDigits = id.substr(0, 4);
    return visitDate + idDigits;
  };

  useEffect(() => {
    const barcodeNumber = createBarcodeNm(visitDate, id);
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeNumber, { height: 20, displayValue: true });
    setBcImgUrl(canvas.toDataURL("image/png"));
  }, [visitDate, id]);

  return (
    <div>
      {bcImgUrl && <img src={bcImgUrl} alt="Barcode" />}
    </div>
  );
};

export default TicketBarcode;
