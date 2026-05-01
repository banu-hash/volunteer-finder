import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";
import NGOTypes "../types/ngo";
import TaskTypes "../types/task";
import NotificationTypes "../types/notification";
import AdminTypes "../types/admin";

// Note: seed principals are derived from single-byte blobs to guarantee
// validity without relying on Principal.fromText() which traps on invalid strings.

module {
  public func seedData(
    volunteers : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
    activityLog : List.List<AdminTypes.ActivityLog>,
    nextTaskId : { var value : Nat },
    nextNotificationId : { var value : Nat },
    nextLogId : { var value : Nat },
    roleAssigner : (userId : CommonTypes.UserId, role : CommonTypes.UserRole) -> ()
  ) : () {
    // Skip if already seeded
    if (volunteers.size() > 0) { return };

    let now = Time.now();

    // ----- Seed Principals (derived from blob literals for guaranteed validity) -----
    // NGO principals
    let ngo1Id = ("\01" : Blob).fromBlob();
    let ngo2Id = ("\02" : Blob).fromBlob();
    let ngo3Id = ("\03" : Blob).fromBlob();

    // Volunteer principals
    let v1Id = ("\04" : Blob).fromBlob();
    let v2Id = ("\05" : Blob).fromBlob();
    let v3Id = ("\06" : Blob).fromBlob();
    let v4Id = ("\07" : Blob).fromBlob();
    let v5Id = ("\08" : Blob).fromBlob();
    let v6Id = ("\09" : Blob).fromBlob();
    let v7Id = ("\0a" : Blob).fromBlob();
    let v8Id = ("\0b" : Blob).fromBlob();
    let v9Id = ("\0c" : Blob).fromBlob();
    let v10Id = ("\0d" : Blob).fromBlob();

    // ----- Assign roles -----
    roleAssigner(ngo1Id, #ngo);
    roleAssigner(ngo2Id, #ngo);
    roleAssigner(ngo3Id, #ngo);
    roleAssigner(v1Id, #volunteer);
    roleAssigner(v2Id, #volunteer);
    roleAssigner(v3Id, #volunteer);
    roleAssigner(v4Id, #volunteer);
    roleAssigner(v5Id, #volunteer);
    roleAssigner(v6Id, #volunteer);
    roleAssigner(v7Id, #volunteer);
    roleAssigner(v8Id, #volunteer);
    roleAssigner(v9Id, #volunteer);
    roleAssigner(v10Id, #volunteer);

    // ----- Seed NGOs -----
    let ngo1 : NGOTypes.NGOProfile = {
      id = ngo1Id;
      var name = "Asha Foundation";
      var description = "Working towards education and empowerment of underprivileged children across India.";
      var contactEmail = "contact@ashafoundation.org";
      var website = "https://ashafoundation.org";
      var status = #approved;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    let ngo2 : NGOTypes.NGOProfile = {
      id = ngo2Id;
      var name = "Green Earth Initiative";
      var description = "Environmental conservation and climate action through community participation.";
      var contactEmail = "hello@greenearth.org";
      var website = "https://greenearth.org";
      var status = #approved;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    let ngo3 : NGOTypes.NGOProfile = {
      id = ngo3Id;
      var name = "HealthBridge India";
      var description = "Bridging the healthcare gap in rural and semi-urban communities.";
      var contactEmail = "info@healthbridge.in";
      var website = "https://healthbridge.in";
      var status = #pending;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    ngos.add(ngo1Id, ngo1);
    ngos.add(ngo2Id, ngo2);
    ngos.add(ngo3Id, ngo3);

    // ----- Seed Volunteers -----
    let delhi : CommonTypes.Location = { lat = 28.6139; lng = 77.2090; displayName = "Delhi, India" };
    let mumbai : CommonTypes.Location = { lat = 19.0760; lng = 72.8777; displayName = "Mumbai, India" };
    let bangalore : CommonTypes.Location = { lat = 12.9716; lng = 77.5946; displayName = "Bangalore, India" };
    let chennai : CommonTypes.Location = { lat = 13.0827; lng = 80.2707; displayName = "Chennai, India" };

    let v1 : VolunteerTypes.VolunteerProfile = {
      id = v1Id;
      var name = "Arjun Sharma";
      var bio = "Passionate educator with 5 years of teaching experience in government schools.";
      var profilePhoto = null;
      var skills = ["Education", "Teaching", "Mentoring"];
      var location = ?delhi;
      var availability = "Weekends";
      var isActive = true;
      var totalTasksCompleted = 8;
      var rating = 4.7;
      var ratingCount = 8;
      createdAt = now;
      var updatedAt = now;
    };
    let v2 : VolunteerTypes.VolunteerProfile = {
      id = v2Id;
      var name = "Priya Nair";
      var bio = "Nurse with expertise in primary healthcare and community medicine.";
      var profilePhoto = null;
      var skills = ["Healthcare", "First Aid", "Community Medicine"];
      var location = ?mumbai;
      var availability = "Evenings and weekends";
      var isActive = true;
      var totalTasksCompleted = 12;
      var rating = 4.9;
      var ratingCount = 12;
      createdAt = now;
      var updatedAt = now;
    };
    let v3 : VolunteerTypes.VolunteerProfile = {
      id = v3Id;
      var name = "Rahul Verma";
      var bio = "Environmental engineer focused on waste management and sustainability projects.";
      var profilePhoto = null;
      var skills = ["Environment", "Waste Management", "Sustainability"];
      var location = ?bangalore;
      var availability = "Full-time available";
      var isActive = true;
      var totalTasksCompleted = 6;
      var rating = 4.5;
      var ratingCount = 6;
      createdAt = now;
      var updatedAt = now;
    };
    let v4 : VolunteerTypes.VolunteerProfile = {
      id = v4Id;
      var name = "Sneha Iyer";
      var bio = "Software developer offering tech support and digital literacy training.";
      var profilePhoto = null;
      var skills = ["Tech Support", "Software Development", "Digital Literacy"];
      var location = ?chennai;
      var availability = "Weekends";
      var isActive = true;
      var totalTasksCompleted = 4;
      var rating = 4.3;
      var ratingCount = 4;
      createdAt = now;
      var updatedAt = now;
    };
    let v5 : VolunteerTypes.VolunteerProfile = {
      id = v5Id;
      var name = "Mohammed Ali";
      var bio = "Community organizer experienced in welfare programs and social outreach.";
      var profilePhoto = null;
      var skills = ["Community Care", "Social Work", "Outreach"];
      var location = ?delhi;
      var availability = "Mornings";
      var isActive = true;
      var totalTasksCompleted = 15;
      var rating = 4.8;
      var ratingCount = 15;
      createdAt = now;
      var updatedAt = now;
    };
    let v6 : VolunteerTypes.VolunteerProfile = {
      id = v6Id;
      var name = "Kavitha Reddy";
      var bio = "Food security advocate and trained cook managing food distribution drives.";
      var profilePhoto = null;
      var skills = ["Food Distribution", "Logistics", "Community Care"];
      var location = ?mumbai;
      var availability = "Weekends";
      var isActive = true;
      var totalTasksCompleted = 10;
      var rating = 4.6;
      var ratingCount = 10;
      createdAt = now;
      var updatedAt = now;
    };
    let v7 : VolunteerTypes.VolunteerProfile = {
      id = v7Id;
      var name = "Suresh Kumar";
      var bio = "Civil engineer with hands-on experience in construction and repair projects.";
      var profilePhoto = null;
      var skills = ["Construction", "Civil Engineering", "Carpentry"];
      var location = ?bangalore;
      var availability = "Weekdays";
      var isActive = true;
      var totalTasksCompleted = 7;
      var rating = 4.4;
      var ratingCount = 7;
      createdAt = now;
      var updatedAt = now;
    };
    let v8 : VolunteerTypes.VolunteerProfile = {
      id = v8Id;
      var name = "Ananya Das";
      var bio = "Animal welfare activist running a local rescue and rehabilitation network.";
      var profilePhoto = null;
      var skills = ["Animal Care", "Veterinary Assistance", "Rescue Operations"];
      var location = ?chennai;
      var availability = "Evenings";
      var isActive = true;
      var totalTasksCompleted = 9;
      var rating = 4.7;
      var ratingCount = 9;
      createdAt = now;
      var updatedAt = now;
    };
    let v9 : VolunteerTypes.VolunteerProfile = {
      id = v9Id;
      var name = "Vikram Singh";
      var bio = "Healthcare worker specialising in mental health awareness and counselling.";
      var profilePhoto = null;
      var skills = ["Healthcare", "Mental Health", "Counselling"];
      var location = ?delhi;
      var availability = "Full-time available";
      var isActive = true;
      var totalTasksCompleted = 3;
      var rating = 4.2;
      var ratingCount = 3;
      createdAt = now;
      var updatedAt = now;
    };
    let v10 : VolunteerTypes.VolunteerProfile = {
      id = v10Id;
      var name = "Deepa Menon";
      var bio = "Teacher and curriculum designer with experience in adult education programs.";
      var profilePhoto = null;
      var skills = ["Education", "Curriculum Design", "Mentoring"];
      var location = ?mumbai;
      var availability = "Weekends and evenings";
      var isActive = true;
      var totalTasksCompleted = 11;
      var rating = 4.8;
      var ratingCount = 11;
      createdAt = now;
      var updatedAt = now;
    };
    volunteers.add(v1Id, v1);
    volunteers.add(v2Id, v2);
    volunteers.add(v3Id, v3);
    volunteers.add(v4Id, v4);
    volunteers.add(v5Id, v5);
    volunteers.add(v6Id, v6);
    volunteers.add(v7Id, v7);
    volunteers.add(v8Id, v8);
    volunteers.add(v9Id, v9);
    volunteers.add(v10Id, v10);

    // ----- Seed Tasks -----
    // Task 0
    let t0 : TaskTypes.Task = {
      id = 0;
      var title = "Teach Basic Literacy to Village Children";
      var description = "Conduct 2-week literacy camp for 30 children aged 6-12 in Mehrauli village.";
      var requiredSkills = ["Education", "Teaching"];
      var location = ?{ lat = 28.5244; lng = 77.1855; displayName = "Mehrauli, Delhi" };
      var deadline = now + 30 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #verified;
      createdByNGO = ngo1Id;
      var assignedVolunteer = ?v1Id;
      var proofUrls = [];
      createdAt = now - 20 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 2 * 24 * 3600 * 1_000_000_000;
    };
    // Task 1
    let t1 : TaskTypes.Task = {
      id = 1;
      var title = "Mobile Health Camp – Blood Pressure Screening";
      var description = "Run a one-day free BP screening camp for 200 residents in Dharavi.";
      var requiredSkills = ["Healthcare", "First Aid"];
      var location = ?{ lat = 19.0400; lng = 72.8547; displayName = "Dharavi, Mumbai" };
      var deadline = now + 7 * 24 * 3600 * 1_000_000_000;
      var priority = #urgent;
      var status = #accepted;
      createdByNGO = ngo3Id;
      var assignedVolunteer = ?v2Id;
      var proofUrls = [];
      createdAt = now - 3 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 1 * 24 * 3600 * 1_000_000_000;
    };
    // Task 2
    let t2 : TaskTypes.Task = {
      id = 2;
      var title = "Tree Plantation Drive – Cubbon Park";
      var description = "Plant 500 native saplings along the perimeter of Cubbon Park.";
      var requiredSkills = ["Environment", "Sustainability"];
      var location = ?{ lat = 12.9763; lng = 77.5929; displayName = "Cubbon Park, Bangalore" };
      var deadline = now + 14 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #completed;
      createdByNGO = ngo2Id;
      var assignedVolunteer = ?v3Id;
      var proofUrls = [];
      createdAt = now - 10 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 1 * 24 * 3600 * 1_000_000_000;
    };
    // Task 3
    let t3 : TaskTypes.Task = {
      id = 3;
      var title = "Tech Workshop for Senior Citizens";
      var description = "Run a 3-hour smartphone and internet safety workshop for 50 senior citizens.";
      var requiredSkills = ["Tech Support", "Digital Literacy"];
      var location = ?{ lat = 13.0878; lng = 80.2785; displayName = "T. Nagar, Chennai" };
      var deadline = now + 10 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #pending;
      createdByNGO = ngo1Id;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now - 2 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 2 * 24 * 3600 * 1_000_000_000;
    };
    // Task 4
    let t4 : TaskTypes.Task = {
      id = 4;
      var title = "Community Kitchen for Flood Victims";
      var description = "Help set up and operate a community kitchen serving 300 meals per day.";
      var requiredSkills = ["Food Distribution", "Community Care"];
      var location = ?{ lat = 19.1136; lng = 72.8697; displayName = "Bandra, Mumbai" };
      var deadline = now + 5 * 24 * 3600 * 1_000_000_000;
      var priority = #urgent;
      var status = #accepted;
      createdByNGO = ngo2Id;
      var assignedVolunteer = ?v6Id;
      var proofUrls = [];
      createdAt = now - 1 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now;
    };
    // Task 5
    let t5 : TaskTypes.Task = {
      id = 5;
      var title = "Repair Classroom Roof – Govt Primary School";
      var description = "Fix the leaking roof of a government primary school before monsoon.";
      var requiredSkills = ["Construction", "Civil Engineering"];
      var location = ?{ lat = 12.9698; lng = 77.7500; displayName = "Whitefield, Bangalore" };
      var deadline = now + 21 * 24 * 3600 * 1_000_000_000;
      var priority = #urgent;
      var status = #pending;
      createdByNGO = ngo1Id;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now - 4 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 4 * 24 * 3600 * 1_000_000_000;
    };
    // Task 6
    let t6 : TaskTypes.Task = {
      id = 6;
      var title = "Stray Animal Rescue & Vaccination Camp";
      var description = "Assist veterinarians vaccinating 100 stray dogs in Adyar area.";
      var requiredSkills = ["Animal Care", "Veterinary Assistance"];
      var location = ?{ lat = 13.0012; lng = 80.2565; displayName = "Adyar, Chennai" };
      var deadline = now + 15 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #verified;
      createdByNGO = ngo2Id;
      var assignedVolunteer = ?v8Id;
      var proofUrls = [];
      createdAt = now - 25 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 5 * 24 * 3600 * 1_000_000_000;
    };
    // Task 7
    let t7 : TaskTypes.Task = {
      id = 7;
      var title = "Mental Health Awareness Drive";
      var description = "Conduct awareness sessions on mental health in 5 colleges in Delhi.";
      var requiredSkills = ["Healthcare", "Mental Health", "Counselling"];
      var location = ?{ lat = 28.6448; lng = 77.2167; displayName = "North Delhi" };
      var deadline = now + 20 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #pending;
      createdByNGO = ngo3Id;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now - 3 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 3 * 24 * 3600 * 1_000_000_000;
    };
    // Task 8
    let t8 : TaskTypes.Task = {
      id = 8;
      var title = "Coding Bootcamp for Underprivileged Youth";
      var description = "4-week coding bootcamp for 20 youth from low-income backgrounds.";
      var requiredSkills = ["Tech Support", "Software Development", "Education"];
      var location = ?{ lat = 13.0569; lng = 80.2425; displayName = "Nungambakkam, Chennai" };
      var deadline = now + 40 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #accepted;
      createdByNGO = ngo1Id;
      var assignedVolunteer = ?v4Id;
      var proofUrls = [];
      createdAt = now - 5 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 2 * 24 * 3600 * 1_000_000_000;
    };
    // Task 9
    let t9 : TaskTypes.Task = {
      id = 9;
      var title = "Waste Segregation Workshop in Apartments";
      var description = "Train residents in 10 apartment complexes on proper waste segregation.";
      var requiredSkills = ["Environment", "Waste Management"];
      var location = ?{ lat = 12.9279; lng = 77.6271; displayName = "Koramangala, Bangalore" };
      var deadline = now + 12 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #completed;
      createdByNGO = ngo2Id;
      var assignedVolunteer = ?v3Id;
      var proofUrls = [];
      createdAt = now - 15 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 3 * 24 * 3600 * 1_000_000_000;
    };
    // Task 10
    let t10 : TaskTypes.Task = {
      id = 10;
      var title = "Free Tuition for Class 10 Board Exam Students";
      var description = "Provide math and science tuition for 40 board exam students in Lajpat Nagar.";
      var requiredSkills = ["Education", "Teaching", "Mentoring"];
      var location = ?{ lat = 28.5665; lng = 77.2431; displayName = "Lajpat Nagar, Delhi" };
      var deadline = now + 60 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #accepted;
      createdByNGO = ngo1Id;
      var assignedVolunteer = ?v10Id;
      var proofUrls = [];
      createdAt = now - 7 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 1 * 24 * 3600 * 1_000_000_000;
    };
    // Task 11
    let t11 : TaskTypes.Task = {
      id = 11;
      var title = "Ration Kit Distribution for Daily Wage Workers";
      var description = "Pack and distribute 200 ration kits containing rice, dal, and cooking oil.";
      var requiredSkills = ["Food Distribution", "Logistics"];
      var location = ?{ lat = 28.7041; lng = 77.1025; displayName = "Rohini, Delhi" };
      var deadline = now + 3 * 24 * 3600 * 1_000_000_000;
      var priority = #urgent;
      var status = #pending;
      createdByNGO = ngo2Id;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now - 1 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 1 * 24 * 3600 * 1_000_000_000;
    };
    // Task 12
    let t12 : TaskTypes.Task = {
      id = 12;
      var title = "First Aid Training for Factory Workers";
      var description = "Conduct certified first aid training sessions for 80 factory workers.";
      var requiredSkills = ["Healthcare", "First Aid"];
      var location = ?{ lat = 19.1896; lng = 72.9656; displayName = "Thane, Mumbai" };
      var deadline = now + 18 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #verified;
      createdByNGO = ngo3Id;
      var assignedVolunteer = ?v2Id;
      var proofUrls = [];
      createdAt = now - 30 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 8 * 24 * 3600 * 1_000_000_000;
    };
    // Task 13
    let t13 : TaskTypes.Task = {
      id = 13;
      var title = "Repair Community Water Pump";
      var description = "Fix the hand pump serving 150 families in Shahadara district.";
      var requiredSkills = ["Construction", "Civil Engineering"];
      var location = ?{ lat = 28.6700; lng = 77.2900; displayName = "Shahadara, Delhi" };
      var deadline = now + 4 * 24 * 3600 * 1_000_000_000;
      var priority = #urgent;
      var status = #pending;
      createdByNGO = ngo1Id;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now;
      var updatedAt = now;
    };
    // Task 14
    let t14 : TaskTypes.Task = {
      id = 14;
      var title = "Social Media Outreach for NGO Fundraiser";
      var description = "Create and schedule 30 social media posts for the upcoming fundraiser campaign.";
      var requiredSkills = ["Tech Support", "Digital Literacy", "Community Care"];
      var location = ?{ lat = 12.9352; lng = 77.6245; displayName = "HSR Layout, Bangalore" };
      var deadline = now + 25 * 24 * 3600 * 1_000_000_000;
      var priority = #normal;
      var status = #accepted;
      createdByNGO = ngo2Id;
      var assignedVolunteer = ?v4Id;
      var proofUrls = [];
      createdAt = now - 6 * 24 * 3600 * 1_000_000_000;
      var updatedAt = now - 2 * 24 * 3600 * 1_000_000_000;
    };

    tasks.add(0, t0);
    tasks.add(1, t1);
    tasks.add(2, t2);
    tasks.add(3, t3);
    tasks.add(4, t4);
    tasks.add(5, t5);
    tasks.add(6, t6);
    tasks.add(7, t7);
    tasks.add(8, t8);
    tasks.add(9, t9);
    tasks.add(10, t10);
    tasks.add(11, t11);
    tasks.add(12, t12);
    tasks.add(13, t13);
    tasks.add(14, t14);

    nextTaskId.value := 15;

    // ----- Seed Notifications -----
    let n0 : NotificationTypes.Notification = {
      id = 0;
      userId = v1Id;
      var message = "You have been assigned to the task: Teach Basic Literacy to Village Children.";
      notificationType = #assignment;
      var read = true;
      createdAt = now - 20 * 24 * 3600 * 1_000_000_000;
    };
    let n1 : NotificationTypes.Notification = {
      id = 1;
      userId = v2Id;
      var message = "You have been assigned to the task: Mobile Health Camp – Blood Pressure Screening.";
      notificationType = #assignment;
      var read = false;
      createdAt = now - 1 * 24 * 3600 * 1_000_000_000;
    };
    let n2 : NotificationTypes.Notification = {
      id = 2;
      userId = ngo1Id;
      var message = "Arjun Sharma completed the task: Teach Basic Literacy to Village Children.";
      notificationType = #completion;
      var read = true;
      createdAt = now - 3 * 24 * 3600 * 1_000_000_000;
    };
    let n3 : NotificationTypes.Notification = {
      id = 3;
      userId = v3Id;
      var message = "Your task Tree Plantation Drive has been verified!";
      notificationType = #acceptance;
      var read = false;
      createdAt = now - 5 * 24 * 3600 * 1_000_000_000;
    };
    let n4 : NotificationTypes.Notification = {
      id = 4;
      userId = v6Id;
      var message = "You have been assigned to the task: Community Kitchen for Flood Victims.";
      notificationType = #assignment;
      var read = false;
      createdAt = now;
    };

    notifications.add(0, n0);
    notifications.add(1, n1);
    notifications.add(2, n2);
    notifications.add(3, n3);
    notifications.add(4, n4);
    nextNotificationId.value := 5;

    // ----- Seed Activity Log -----
    let log0 : AdminTypes.ActivityLog = {
      id = 0;
      userId = ngo1Id;
      action = "NGO_REGISTERED";
      details = "Asha Foundation registered on the platform.";
      timestamp = now - 30 * 24 * 3600 * 1_000_000_000;
    };
    let log1 : AdminTypes.ActivityLog = {
      id = 1;
      userId = ngo2Id;
      action = "NGO_REGISTERED";
      details = "Green Earth Initiative registered on the platform.";
      timestamp = now - 28 * 24 * 3600 * 1_000_000_000;
    };
    let log2 : AdminTypes.ActivityLog = {
      id = 2;
      userId = v1Id;
      action = "VOLUNTEER_REGISTERED";
      details = "Arjun Sharma joined as a volunteer.";
      timestamp = now - 25 * 24 * 3600 * 1_000_000_000;
    };
    let log3 : AdminTypes.ActivityLog = {
      id = 3;
      userId = ngo1Id;
      action = "TASK_CREATED";
      details = "Task 'Teach Basic Literacy to Village Children' created.";
      timestamp = now - 20 * 24 * 3600 * 1_000_000_000;
    };
    let log4 : AdminTypes.ActivityLog = {
      id = 4;
      userId = v1Id;
      action = "TASK_COMPLETED";
      details = "Arjun Sharma completed task 0.";
      timestamp = now - 3 * 24 * 3600 * 1_000_000_000;
    };
    activityLog.add(log0);
    activityLog.add(log1);
    activityLog.add(log2);
    activityLog.add(log3);
    activityLog.add(log4);
    nextLogId.value := 5;
  };
};
