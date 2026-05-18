import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface StackProps {
  cards: React.ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  cardWidth?: number;
  cardHeight?: number;
}

export default function Stack({
  cards,
  randomRotation = true,
  sensitivity = 200,
  sendToBackOnClick = true,
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  cardWidth = 300,
  cardHeight = 400,
}: StackProps) {
  const [stack, setStack] = useState(cards.map((card, index) => ({ id: index, content: card })));
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotations = useRef(
    cards.map(() => (randomRotation ? Math.random() * 10 - 5 : 0))
  );

  const sendToBack = () => {
    setStack((prev) => {
      const newStack = [...prev];
      const firstCard = newStack.shift();
      if (firstCard) newStack.push(firstCard);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      intervalRef.current = setInterval(sendToBack, autoplayDelay);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, isPaused, autoplayDelay]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className="relative"
      style={{ width: cardWidth, height: cardHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {stack.map((card, index) => (
          <CardInStack
            key={card.id}
            index={index}
            totalCards={stack.length}
            rotation={rotations.current[card.id]}
            sendToBack={sendToBack}
            sensitivity={sensitivity}
            sendToBackOnClick={sendToBackOnClick}
            animationConfig={animationConfig}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
          >
            {card.content}
          </CardInStack>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface CardInStackProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  rotation: number;
  sendToBack: () => void;
  sensitivity: number;
  sendToBackOnClick: boolean;
  animationConfig: { stiffness: number; damping: number };
  cardWidth: number;
  cardHeight: number;
}

function CardInStack({
  children,
  index,
  totalCards,
  rotation,
  sendToBack,
  sensitivity,
  sendToBackOnClick,
  animationConfig,
  cardWidth,
  cardHeight,
}: CardInStackProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const isTop = index === 0;
  const scale = 1 - index * 0.05;
  const zIndex = totalCards - index;
  const yOffset = index * -8;

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      sendToBack();
    }
  };

  const handleClick = () => {
    if (sendToBackOnClick && isTop) {
      sendToBack();
    }
  };

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        width: cardWidth,
        height: cardHeight,
        x,
        y,
        rotateX: isTop ? rotateX : 0,
        rotateY: isTop ? rotateY : 0,
        zIndex,
      }}
      initial={{ scale: 0.8, y: 100, opacity: 0 }}
      animate={{
        scale,
        y: yOffset,
        opacity: 1,
        rotate: rotation,
      }}
      exit={{ scale: 0.8, y: 100, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: animationConfig.stiffness,
        damping: animationConfig.damping,
      }}
      drag={isTop}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      whileTap={{ scale: isTop ? 0.98 : scale }}
    >
      {children}
    </motion.div>
  );
}
