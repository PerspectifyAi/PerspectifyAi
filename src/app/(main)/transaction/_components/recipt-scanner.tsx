"use client";

import { useRef, useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export type ScannedData = Partial<{
  amount: number;
  date: string;
  description: string;
  category: string;
}>;

interface RawScanResponse {
  amount: number;
  date: Date | string;
  description: string;
  category: string;
  merchantName: string;
}

interface ReceiptScannerProps {
  onScanComplete: (data: ScannedData) => void;
}

export function ReceiptScanner({ onScanComplete }: ReceiptScannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasProcessed, setHasProcessed] = useState(false);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file: File) => {
    setHasProcessed(false);  // reset so this scan can be processed once
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    await scanReceiptFn(file);
  };

  useEffect(() => {
    // only process once per scan
    if (scannedData && !scanReceiptLoading && !hasProcessed) {
      setHasProcessed(true);

      const raw = scannedData as RawScanResponse;
      const safeData: ScannedData = {
        amount: raw.amount,
        date:
          raw.date instanceof Date
            ? raw.date.toISOString().split("T")[0]
            : typeof raw.date === "string"
            ? raw.date
            : undefined,
        description: raw.description,
        category: raw.category,
      };

      onScanComplete(safeData);
      toast.success("Receipt scanned successfully");
    }
  }, [scannedData, scanReceiptLoading, hasProcessed, onScanComplete]);

  return (
    <div className="flex w-full items-center justify-center">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
        className="relative w-full h-12 overflow-hidden text-white font-medium rounded-xl transition-all shadow-lg group border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
      >
        {/* Animated background */}
        <span className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 ease-in-out animate-[pulse_3s_infinite] z-0" />

        {/* Dark overlay when loading */}
        {scanReceiptLoading && <span className="absolute inset-0 bg-black/20 z-10" />}

        {/* Button content */}
        <span className="relative z-20 flex items-center justify-center gap-2">
          {scanReceiptLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span className="text-sm">Scanning...</span>
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm cursor-pointer">Scan Receipt with AI</span>
            </>
          )}
        </span>
      </Button>
    </div>
  );
}
