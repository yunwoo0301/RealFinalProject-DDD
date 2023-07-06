import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled.div`
  font-size: 2.3rem;
  font-weight: 900;
  position: relative;
  display: inline-flex;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Logo = () => {
  const navigation = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const text = ':Diverse Different Display';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded((prevExpanded) => !prevExpanded);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickToMain = () => {
    navigation("/");
  }

  return (
    <LogoContainer onClick={onClickToMain}>
      {!isExpanded && <span>:DDD</span>}
      <motion.span
        style={{ whiteSpace: 'nowrap' }}
        initial={{ scaleX: 0, height: '0%' }}
        animate={{
          scaleX: isExpanded ? 1 : 0,
          height: isExpanded ? '100%' : '0%'
        }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded && (
          <motion.span
            style={{
              display: 'inline-flex',
              gap: '0.2ch' // 글자 간 간격 조정
            }}
          >
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  width: 'auto',
                  overflow: 'visible', // 글자 넘침 처리
                  verticalAlign: 'top' 
                }}
                initial={{ scaleX: index === 0 ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </motion.span>
    </LogoContainer>
  );
};

export default Logo;
