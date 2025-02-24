import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AgentType } from '../types';
import { mockData } from '../assets/mockData';

const LOCAL_STORAGE_KEY = "agentsData";

interface AgentContextProps {
  agents: AgentType[];
  createAgent: (agent: AgentType) => void;
  editAgent: (updatedAgent: AgentType) => void;
  deleteAgent: (id: number) => void;
}

const AgentContext = createContext<AgentContextProps | undefined>(undefined);

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentContext must be used within an AgentProvider');
  }
  return context;
};

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedAgents = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialAgents = storedAgents ? JSON.parse(storedAgents) : mockData;
  const [agents, setAgents] = useState<AgentType[]>(initialAgents);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(agents));
  }, [agents]);

  const createAgent = (agent: AgentType) => {
    setAgents([...agents, agent]);
  };

  const editAgent = (updatedAgent: AgentType) => {
    const index = agents.findIndex(agent => agent.id === updatedAgent.id);
    setAgents([...agents.slice(0, index), updatedAgent, ...agents.slice(index + 1)]);
  };

  const deleteAgent = (id: number) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <AgentContext.Provider value={{ agents, createAgent, editAgent, deleteAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
