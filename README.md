[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/j48a217e)
# IncluWork-final project
 
## Description
IncluWork is a full stack web application aimed at providing job opportunities to differently abled individuals, addressing human rights and equality issues as outlined by the UN. The platform facilitates employment by connecting job seekers with inclusive employers who offer accommodations and support services to create an accessible work environment. Job seekers can create profiles, while employers can post job listings and review candidates. Admin verification ensures that disability proofs provided by job seekers are valid before completing job applications. The system matches job seeker skills with employer job preferences to enhance job placement.
 
## Object Model (Mermaid Code)
```mermaid
classDiagram
    class User {
      +UserID: int
      +Name: string
      +Email: string
      +Password: string
      +Gender: string
      +CreateProfile()
      +EditProfile()
      +DeleteProfile()
    }
    class JobSeeker {
      +DisabilityProof: string
      +Skills: string[]
      +JobPreferences: string[]
    }
    class Employer {
      +CompanyName: string
      +CompanyProfile: string
      +InclusivityRating: float
      +AccommodationFacilities: string[]
      +CreateJobListing()
      +EditCompanyProfile()
      +ViewCandidates()
      +RateCandidate()
    }
    class Job {
      +JobID: int
      +EmployerID: int
      +Title: string
      +Description: string
      +Location: string
      +PartTime_FullTime: bool
      +Industry: string
      +AccessibilityFeatures: string[]
      +Requirements: string
      +Responsibilities: string
      +PostJob()
      +EditJob()
      +DeleteJob()
      +ViewApplications()
    }
    class JobApplication {
      +ApplicationID: int
      +ApplicationDate: Date
      +Status: enum
      +SubmitApplication()
      +WithdrawApplication()
      +UpdateStatus()
      *-- "1" User : submitted by
    }
    class Review {
      +ReviewID: int
      +EmployerID: int
      +UserID: int
      +Rating: float
      +Comment: string
      +Date: Date
      +SubmitReview()
      +EditReview()
      +DeleteReview()
    }
    class AccessibilityFeature {
      +FeatureID: int
      +Description: string
      +AddFeature()
      +EditFeature()
      +DeleteFeature()
    }
    class Admin {
      +ManageApplication()
      +ManageDisabilityProof()
      +DeleteUserProfile()
    }
    User <|-- JobSeeker
    User <|-- Employer
    User "1" -- "0..*" Job : applies to >
    Job "1" -- "1..*" JobApplication : has >
    User "1" -- "1..*" Review : writes >
    Employer "1" -- "0..*" Job : posts >
    JobApplication "1" *-- "1" JobSeeker : submitted by
    Review "0..*" -- "1" Employer : reviews >
    Admin o-- User : manages
 
## Team Members
 
- **Apurva Raj**
  - Email: apurvaraj9808@gmail.com
 
- **Malini Janaki Sankaran**
  - Email: janakisankaran.m@northeastern.edu
 
- **Soumya Ganesh**
  - Email: ganesh.so@northeastern.edu
 
- **Vamsi Krishna Poluru**
  - Email: poluru.va@northeastern.edu
 