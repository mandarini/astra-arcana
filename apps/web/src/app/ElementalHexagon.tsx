import React from 'react';
import {
  Element,
  HEXAGON_ELEMENT_POSITIONS,
  ELEMENT_COLORS,
  ELEMENTAL_RELATIONSHIPS,
  SpellVisualizationData,
  getElementRelationshipType,
} from '@astra-arcana/spellcasting-types';

interface ElementNodeProps {
  element: Element;
  strength: number;
  position: { x: number; y: number };
  isDominant: boolean;
}

const ElementNode: React.FC<ElementNodeProps> = ({
  element,
  strength,
  position,
  isDominant,
}) => {
  if (element === 'neutral') return null;

  const colors = ELEMENT_COLORS[element];
  const glowIntensity = Math.min(1, 0.2 + strength * 0.1);
  const nodeSize = 20 + Math.min(strength * 2, 15); // Cap the size growth

  const getElementSymbol = (element: Element): string => {
    const symbols = {
      fire: '🔥',
      water: '💧',
      earth: '🌍',
      air: '🌪️',
      aether: '✨',
      void: '🕳️',
      neutral: '⚪',
    };
    return symbols[element];
  };

  const getElementName = (element: Element): string => {
    return element.charAt(0).toUpperCase() + element.slice(1);
  };

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {/* Glow effect */}
      {strength > 0 && (
        <circle
          r={nodeSize + 15}
          fill={colors.glow}
          opacity={glowIntensity}
          filter="blur(8px)"
          className={isDominant ? 'animate-pulse' : ''}
        />
      )}

      {/* Main element circle */}
      <circle
        r={nodeSize}
        fill={strength > 0 ? colors.primary : '#333333'}
        className="transition-all duration-300"
        opacity={strength > 0 ? 1 : 0.5}
      />

      {/* Element symbol */}
      <text
        textAnchor="middle"
        dy="0.35em"
        fontSize="16"
        fill="white"
        stroke="rgba(0,0,0,0.8)"
        strokeWidth="0.5"
        className="pointer-events-none select-none font-bold"
      >
        {getElementSymbol(element)}
      </text>

      {/* Element name */}
      <text
        textAnchor="middle"
        dy="45"
        fill="white"
        stroke="rgba(0,0,0,0.8)"
        strokeWidth="0.5"
        fontSize="12"
        fontWeight="bold"
        className="pointer-events-none select-none"
      >
        {getElementName(element)}
      </text>

      {/* Strength indicator */}
      {strength > 0 && (
        <text
          textAnchor="middle"
          dy="60"
          fill="white"
          stroke="rgba(0,0,0,0.8)"
          strokeWidth="0.5"
          fontSize="10"
          fontWeight="bold"
          className="pointer-events-none select-none"
        >
          {strength.toFixed(1)}
        </text>
      )}
    </g>
  );
};

interface ConnectionLineProps {
  element1: Element;
  element2: Element;
  strength: number;
  relationshipType: 'opposite' | 'neighbor' | 'neutral';
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  element1,
  element2,
  strength,
  relationshipType,
}) => {
  if (relationshipType === 'neutral' || strength <= 0) return null;

  const pos1 = HEXAGON_ELEMENT_POSITIONS[element1];
  const pos2 = HEXAGON_ELEMENT_POSITIONS[element2];
  const colors1 = ELEMENT_COLORS[element1];
  const colors2 = ELEMENT_COLORS[element2];

  const strokeWidth = Math.max(1, Math.min(strength * 0.5, 4));
  const opacity = Math.min(1, 0.3 + strength * 0.1);

  // Create gradient ID for this connection
  const gradientId = `gradient-${element1}-${element2}`;

  return (
    <>
      {/* Define gradient */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors1.primary} />
          <stop offset="100%" stopColor={colors2.primary} />
        </linearGradient>
      </defs>

      {/* Connection line */}
      <line
        x1={pos1.x}
        y1={pos1.y}
        x2={pos2.x}
        y2={pos2.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        opacity={opacity}
        strokeDasharray={relationshipType === 'opposite' ? '8,4' : 'none'}
        className={
          strength > 5 ? 'animate-pulse' : 'transition-all duration-300'
        }
      />
    </>
  );
};

interface ElementalHexagonProps {
  visualizationData: SpellVisualizationData | null;
  className?: string;
}

export const ElementalHexagon: React.FC<ElementalHexagonProps> = ({
  visualizationData,
  className = '',
}) => {
  const elements: Element[] = [
    'fire',
    'water',
    'earth',
    'air',
    'aether',
    'void',
  ];

  // Generate all possible connections
  const connections = [];
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const element1 = elements[i];
      const element2 = elements[j];
      const relationshipType = getElementRelationshipType(element1, element2);

      if (relationshipType !== 'neutral' && visualizationData) {
        const strength1 = visualizationData.elementalBalance[element1] || 0;
        const strength2 = visualizationData.elementalBalance[element2] || 0;
        const combinedStrength = (strength1 + strength2) / 2;

        if (combinedStrength > 0) {
          connections.push({
            element1,
            element2,
            strength: combinedStrength,
            relationshipType,
          });
        }
      }
    }
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Background hexagon */}
        <polygon
          points="200,50 350,150 350,250 200,350 50,250 50,150"
          fill="none"
          stroke="rgba(168, 85, 247, 0.3)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="opacity-50"
        />

        {/* Connection lines */}
        {connections.map(
          ({ element1, element2, strength, relationshipType }) => (
            <ConnectionLine
              key={`${element1}-${element2}`}
              element1={element1}
              element2={element2}
              strength={strength}
              relationshipType={relationshipType}
            />
          )
        )}

        {/* Element nodes */}
        {elements.map((element) => (
          <ElementNode
            key={element}
            element={element}
            strength={visualizationData?.elementalBalance[element] || 0}
            position={HEXAGON_ELEMENT_POSITIONS[element]}
            isDominant={visualizationData?.dominantElement === element}
          />
        ))}
      </svg>

      {/* Legend */}
      {visualizationData && (
        <div className="absolute bottom-2 left-2 text-xs text-purple-300 bg-gray-800 bg-opacity-75 rounded p-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-0.5 bg-purple-400 mr-1"></div>
              <span>Neighbors</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-0.5 bg-purple-400 mr-1 border-dashed border-t"></div>
              <span>Opposites</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
