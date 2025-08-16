'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface SkillGapsProps {
  careerPath: string;
  skillGaps: string[];
}

export function SkillGaps({ careerPath, skillGaps }: SkillGapsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-full max-w-md',
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>Skill Gaps for {careerPath}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillGaps.map((skill, index) => (
              <Badge key={index} variant="destructive">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
