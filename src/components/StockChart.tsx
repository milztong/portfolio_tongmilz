'use client';

import { useEffect, useRef } from 'react';
import { createChart, LineStyle, ColorType, LineSeries } from 'lightweight-charts';

interface PricePoint {
  date: string;
  close: number;
}

interface StockChartProps {
  prices: PricePoint[];
  predictionPrice?: number;
}

export default function StockChart({ prices, predictionPrice }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || prices.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#737373',
        fontFamily: 'inherit',
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        vertLine: { color: '#404040', style: LineStyle.Dashed },
        horzLine: { color: '#404040', style: LineStyle.Dashed },
      },
      rightPriceScale: {
        borderColor: '#1a1a1a',
      },
      timeScale: {
        borderColor: '#1a1a1a',
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      handleScroll: true,
      handleScale: true,
    });

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    });
    resizeObserver.observe(containerRef.current);

    // v5: use addSeries instead of addLineSeries
    const lineSeries = chart.addSeries(LineSeries, {
      color: '#ffffff',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBackgroundColor: '#ffffff',
      lastValueVisible: true,
      priceLineVisible: true,
      priceLineColor: '#404040',
      priceLineStyle: LineStyle.Dashed,
    });

    const data = prices.map((p) => ({
      time: p.date as unknown as import('lightweight-charts').Time,
      value: p.close,
    }));
    lineSeries.setData(data);

    // Optional prediction price line
    if (predictionPrice) {
      lineSeries.createPriceLine({
        price: predictionPrice,
        color: '#22c55e',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Deine Vorhersage',
      });
    }

    chart.timeScale().fitContent();

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [prices, predictionPrice]);

  return <div ref={containerRef} className="w-full h-full" />;
}