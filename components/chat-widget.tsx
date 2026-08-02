'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!res.ok) throw new Error('Error en la respuesta');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages([
            ...newMessages,
            { role: 'assistant', content: assistantContent }
          ]);
        }
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Lo siento, ha habido un error. Inténtalo de nuevo.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    '¿Qué productos para mujer tenéis?',
    '¿Tenéis Nike en el catálogo?',
    '¿Cuánto cuesta el envío?'
  ];

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer'
            aria-label='Abrir chat'
          >
            <MessageCircle className='w-6 h-6' />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground'>
              <div className='flex items-center gap-2'>
                <Bot className='w-5 h-5' />
                <div>
                  <p className='font-semibold text-sm'>Asistente SneakDrop</p>
                  <p className='text-xs opacity-80'>¿En qué puedo ayudarte?</p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsOpen(false)}
                className='text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 cursor-pointer'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {messages.length === 0 && (
                <div className='space-y-3'>
                  <div className='flex items-start gap-2'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                      <Bot className='w-4 h-4 text-primary' />
                    </div>
                    <div className='bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]'>
                      <p className='text-sm'>
                        ¡Hola! Soy el asistente de SneakDrop. ¿En qué puedo
                        ayudarte?
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2 pl-10'>
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => {
                            const userMessage: Message = {
                              role: 'user',
                              content: q
                            };
                            setMessages([userMessage]);
                            setIsLoading(true);
                            fetch('/api/chat', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ messages: [userMessage] })
                            })
                              .then(async res => {
                                const reader = res.body?.getReader();
                                const decoder = new TextDecoder();
                                let content = '';
                                setMessages([
                                  userMessage,
                                  { role: 'assistant', content: '' }
                                ]);
                                if (reader) {
                                  while (true) {
                                    const { done, value } = await reader.read();
                                    if (done) break;
                                    content += decoder.decode(value, {
                                      stream: true
                                    });
                                    setMessages([
                                      userMessage,
                                      { role: 'assistant', content }
                                    ]);
                                  }
                                }
                              })
                              .catch(() => {
                                setMessages([
                                  userMessage,
                                  {
                                    role: 'assistant',
                                    content:
                                      'Lo siento, ha habido un error.'
                                  }
                                ]);
                              })
                              .finally(() => setIsLoading(false));
                          }, 0);
                          setInput('');
                        }}
                        className='text-xs px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer'
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : 'bg-primary/10'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className='w-4 h-4' />
                    ) : (
                      <Bot className='w-4 h-4 text-primary' />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[85%] text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-gray-100 dark:bg-gray-800 rounded-tl-sm'
                    }`}
                  >
                    {msg.content || (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className='border-t border-gray-200 dark:border-gray-800 p-3'>
              <div className='flex items-center gap-2'>
                <input
                  ref={inputRef}
                  type='text'
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Escribe tu mensaje...'
                  disabled={isLoading}
                  className='flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50'
                />
                <Button
                  size='icon'
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className='rounded-full w-9 h-9 cursor-pointer'
                >
                  {isLoading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
