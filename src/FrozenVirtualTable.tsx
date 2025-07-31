/** @format */

import React, { useRef, useState, useEffect } from "react";
import { VariableSizeGrid as Grid } from "react-window";

const COLUMN_WIDTH = 110;
const ROW_HEIGHT = 40;
const ROW_COUNT = 1000;
const COLUMN_COUNT = 50;

const FrozenVirtualTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainGridRef = useRef<any>(null);
  const leftGridRef = useRef<any>(null);
  const rightGridRef = useRef<any>(null);

  const [gridWidth, setGridWidth] = useState(800);
  const [gridHeight, setGridHeight] = useState(600);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setGridWidth(containerRef.current.clientWidth);
        setGridHeight(containerRef.current.clientHeight);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const onScroll = ({ scrollTop }: { scrollTop: number }) => {
    leftGridRef.current?.scrollTo({ scrollTop });
    rightGridRef.current?.scrollTo({ scrollTop });
  };

  const getColumnWidth = (index: number) => COLUMN_WIDTH;
  const getRowHeight = (index: number) => ROW_HEIGHT;

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const isFrozenLeft = columnIndex < 2;
    const isFrozenRight = columnIndex >= COLUMN_COUNT - 2;
    const className = `cell ${isFrozenLeft ? "frozen-left" : ""} ${
      isFrozenRight ? "frozen-right" : ""
    }`;

    return (
      <div className={className} style={style}>
        Row {rowIndex}, Col {columnIndex}
      </div>
    );
  };

  return (
    <div className="root">
      <h2>Virtual Scroll Table with Frozen Columns</h2>
      <div className="table-container" ref={containerRef}>
        <Grid
          ref={mainGridRef}
          columnCount={COLUMN_COUNT - 4}
          columnWidth={getColumnWidth}
          rowCount={ROW_COUNT}
          rowHeight={getRowHeight}
          height={gridHeight}
          width={gridWidth - 4 * COLUMN_WIDTH}
          onScroll={({ scrollTop }) => onScroll({ scrollTop })}
          itemKey={({ columnIndex, rowIndex }) =>
            `${rowIndex}-${columnIndex + 2}`
          }
        >
          {({ columnIndex, rowIndex, style }) => (
            <Cell
              columnIndex={columnIndex + 2}
              rowIndex={rowIndex}
              style={style}
            />
          )}
        </Grid>

        {/* Frozen Left Columns */}
        <div className="overlay left-overlay" style={{ height: gridHeight }}>
          <Grid
            ref={leftGridRef}
            columnCount={2}
            columnWidth={getColumnWidth}
            rowCount={ROW_COUNT}
            rowHeight={getRowHeight}
            height={gridHeight}
            width={2 * COLUMN_WIDTH}
            style={{ overflow: "hidden" }}
            itemKey={({ columnIndex, rowIndex }) =>
              `frozen-left-${rowIndex}-${columnIndex}`
            }
          >
            {({ columnIndex, rowIndex, style }) => (
              <Cell
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                style={style}
              />
            )}
          </Grid>
        </div>

        {/* Frozen Right Columns */}
        <div
          className="overlay right-overlay"
          style={{ height: gridHeight, right: 0 }}
        >
          <Grid
            ref={rightGridRef}
            columnCount={2}
            columnWidth={getColumnWidth}
            rowCount={ROW_COUNT}
            rowHeight={getRowHeight}
            height={gridHeight}
            width={2 * COLUMN_WIDTH}
            style={{ overflow: "hidden" }}
            itemKey={({ columnIndex, rowIndex }) =>
              `frozen-right-${rowIndex}-${COLUMN_COUNT - 2 + columnIndex}`
            }
          >
            {({ columnIndex, rowIndex, style }) => (
              <Cell
                columnIndex={COLUMN_COUNT - 2 + columnIndex}
                rowIndex={rowIndex}
                style={style}
              />
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default FrozenVirtualTable;
