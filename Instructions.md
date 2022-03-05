# Welcome to Triad’s Technical Exercise

This will (hopefully) be a low stress, accurate to life means of assessing your technical prowess. Here’s how it will work.

Below is a real/very similar problem we have faced. Over the next 5 days we ask that you create and deliver a solution. We estimate this should take you  ~3 hours. You have already been invited to our Slack channel. In the channel you can reach out to the team at any time to ask whatever questions you have. Fork this repo and complete the needed work.  Once complete please submit a PR back to this root repo.  Then email candi.lemoine@triadhq.com and zack.bessler@triadhq.com to let us know you are done.  Lastly, We will follow up with a 45 minute debrief.

Lastly, we understand this is a significant time commitment and we would like to thank you in advance for taking the time.

## The problem:

Consider a system with the below data struture.

-   You have many Assessments each with 1-many Questions.
-   You have many Students with 0-many Assessments assigned to them.
-   You have many AssessmentLogs, created each time a Student starts an Assessment

```typescript
export interface Assessment {
    id: number;
    name: string;
    description: string;
    open_time: Date;
    close_time: Date;
    time_limit: number;
    is_locked: boolean;
    questions: Question[];
}

export interface Question {
    id: number;
    name: string;
    text: string;
    answers: string[];
}

export interface AssessmentLog {
    id: number;
    is_complete: boolean;
    start_time: Date;
    total_time: number;
    student: Student;
    assessment: Assessment;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    school_id: string;
    assessments: any[];
}
```

Task: Return the Student's assessment list sorted and in the following groupings:

-   upcomming, open, expired, inprogress, and completed

A good place to start is the `student.controller.ts` file


### Deliverables

-   Submit a PR with your fork
-   Don't forget any other files you may need
-   Feel free to add packages that you feel are appropriate
-   Please include any tests or documentation as needed << Not required for time reasons

### Assumptions 
-   Assume this app is live in production despite the very simple setup (server and routing)
