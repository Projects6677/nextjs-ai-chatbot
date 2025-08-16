'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface CareerPathCardProps {
  careerPath: string;
  description: string;
  requiredSkills: string[];
}

export function CareerPathCard({ careerPath, description, requiredSkills }: CareerPathCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-full max-w-md cursor-pointer',
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>{careerPath}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
