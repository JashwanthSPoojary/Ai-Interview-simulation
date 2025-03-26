import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, CheckCircle, AlertTriangle } from 'lucide-react';

const Container = ({feedback}:{feedback:{
    role: string;
    overallShortFeedback: string;
    inDepthFeedback: {
        question: string;
        improvement: string;
        suggestion: string;
    }[];
}}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Interview Feedback</CardTitle>
            <Award size={32} />
          </div>
          <p className="text-sm text-muted-foreground">Role: {feedback.role}</p>
        </CardHeader>
        
        <CardContent>
          {/* Overall Feedback Section */}
          <section className="mb-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="mr-2 text-primary" />
              <h2 className="text-xl font-semibold">Overall Assessment</h2>
            </div>
            <p className="bg-secondary/50 p-4 rounded-lg">
              {feedback.overallShortFeedback}
            </p>
          </section>

          {/* Detailed Feedback Section */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="mr-2 text-destructive" />
              <h2 className="text-xl font-semibold">Question-wise Feedback</h2>
            </div>
            
            {feedback.inDepthFeedback.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-medium text-lg mb-1">Question:</h3>
                    <p className="text-muted-foreground">{item.question}</p>
                  </div>
                  
                  <div className="mb-2">
                    <h3 className="font-medium text-lg mb-1">Areas of Improvement:</h3>
                    <p className="text-destructive">{item.improvement}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-1">Suggestions:</h3>
                    <p className="text-primary">{item.suggestion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Container;