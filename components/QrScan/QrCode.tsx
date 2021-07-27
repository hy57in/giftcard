import QrCodeReact from "qrcode.react";
import styled from "styled-components";

const ResponsiveSvgWrapper = styled.div`
  & > svg {
    display: block; /* svg is "inline" by default */
    height: auto; /* reset height */
    width: 100%; /* reset width */
  }
`;

const QrCode = ({ value }: { value: string }) => (
  <ResponsiveSvgWrapper>
    <QrCodeReact renderAs="svg" value={value} />
  </ResponsiveSvgWrapper>
);

export default QrCode;
