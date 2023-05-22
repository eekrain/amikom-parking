import { createSignal } from "solid-js";
import dayjs from "dayjs";
import { QRCodeSVG } from "solid-qr-code";
import { createTimer } from "@solid-primitives/timer";

const initDate = dayjs().add(30, "second");

export default function Home() {
  const [qrData, setQrData] = createSignal(`${initDate.toISOString()}`);
  const [validUntil, setValidUntil] = createSignal(dayjs().add(30, "second"));
  const [validRemaining, setValidRemaining] = createSignal(
    validUntil().diff(dayjs(), "second")
  );
  const cb = () => {
    if (validRemaining() > 0) {
      const remainingSeconds = validUntil().diff(dayjs(), "second");
      setValidRemaining(remainingSeconds);
    } else {
      const newUntil = dayjs().add(30, "second");
      setQrData(newUntil.toISOString());
      setValidUntil(newUntil);
      setValidRemaining(newUntil.diff(dayjs(), "second"));
    }
  };
  createTimer(cb, 1000, setInterval);

  const [dummyQRData] = createSignal({
    key: import.meta.env.VITE_WEB_ADMIN_QRKEY,
    validUntil: dayjs().add(1, "year"),
  });

  return (
    <>
      <h1 class="text-2xl text-center mb-6">Scan For Pass</h1>
      <div class="flex justify-center">
        <div class="bg-white rounded-lg shadow-md p-4">
          <QRCodeSVG value={qrData()} width={350} height={350} class="mb-4" />

          <p class="text-2xl text-center">
            Valid for:{" "}
            <span
              classList={{
                "text-green-600": validRemaining() > 10,
                "text-red-600": validRemaining() <= 10,
              }}
            >
              {validRemaining()} second
            </span>
          </p>
        </div>
      </div>
      <p class="mt-24">dummy qr data: {JSON.stringify(dummyQRData())}</p>
    </>
  );
}
