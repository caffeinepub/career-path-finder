import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

actor {
  type SurveyScore = Nat8;
  type SurveyResult = {
    mathInterest : Nat8;
    itSkills : SurveyScore;
    mathSkills : SurveyScore;
    socialProblemSolving : SurveyScore;
    selfReflection : SurveyScore;
    careerSatisfaction : SurveyScore;
    requirementsClarity : SurveyScore;
  };

  type Career = {
    title : Text;
    description : Text;
    requiredSkills : [Text];
    typicalEducation : Text;
  };

  module Career {
    public let IT = {
      title = "Information Technology (IT)";
      description = "Focuses on managing and developing computer systems, networks, and software.";
      requiredSkills = ["Technical proficiency", "Analytical thinking", "Problem-solving"];
      typicalEducation = "Bachelor's degree in Computer Science, Information Systems, or related fields";
    };

    public let Mathematics = {
      title = "Mathematics and Statistics";
      description = "Involves analyzing and interpreting numerical data for various applications.";
      requiredSkills = ["Analytical reasoning", "Attention to detail", "Quantitative skills"];
      typicalEducation = "Bachelor's or higher degree in Mathematics, Statistics, or related fields";
    };

    public let HealthCare = {
      title = "Healthcare (Medical, Nursing, Therapy)";
      description = "Involves treating patients, diagnosing illnesses, and promoting wellness in various specialties.";
      requiredSkills = ["Empathy", "Attention to detail", "Communication skills"];
      typicalEducation = "Varies from associate to doctoral degrees depending on specialization";
    };

    public let SocialWork = {
      title = "Social Work and Counseling";
      description = "Helping individuals and communities improve their well-being and cope with challenges.";
      requiredSkills = ["Empathy", "Active listening", "Interpersonal skills"];
      typicalEducation = "Bachelor's or master's degree in social work, counseling, or psychology";
    };

    public let Business = {
      title = "Business and Management";
      description = "Involves managing organizations, teams, and strategic decision-making across industries.";
      requiredSkills = ["Leadership", "Analytical thinking", "Communication"];
      typicalEducation = "Bachelor's or higher in business, management, or related fields";
    };
  };

  type CareerMatchExplanation = {
    careerTitle : Text;
    description : Text;
    requiredSkills : [Text];
    typicalEducation : Text;
    matchReasons : Text;
  };

  type ChatMessage = {
    isUser : Bool;
    message : Text;
  };

  let careerMessages = Map.empty<Text, [ChatMessage]>();
  let completionMessages = Map.empty<Text, Bool>();

  public type SurveyType = {
    #mathInterest;
    #personalInterest;
    #itSkills;
    #mathSkills;
    #socialProblemSolving;
    #selfReflection;
    #careerSatisfaction;
    #requirementsClarity;
    #careerSurveyTotalScore;
    #careerRecommendationScore;
  };

  public type CareerSurveyResults = {
    type_ : SurveyType;
    itSkills : Nat;
    mathSkills : Nat;
    socialProblemSolving : Nat;
    selfReflection : Nat;
    careerSatisfaction : Nat;
    requirementsClarity : Nat;
  };

  public type CareerRecommendationResultExtensions = {
    itSkills : Nat;
    careerSurveyTotalScore : Nat;
    careerRecommendationScore : Nat;
  };

  public shared ({ caller }) func getCareerRecommendations(surveyResults : SurveyResult) : async ?[CareerMatchExplanation] {
    if (surveyResults.mathInterest < 4) {
      ?[
        {
          careerTitle = Career.HealthCare.title;
          description = Career.HealthCare.description;
          requiredSkills = Career.HealthCare.requiredSkills;
          typicalEducation = Career.HealthCare.typicalEducation;
          matchReasons = "Use your empathy and reasoning to help others live healthier lives and make a positive community impact.";
        },
        {
          careerTitle = Career.SocialWork.title;
          description = Career.SocialWork.description;
          requiredSkills = Career.SocialWork.requiredSkills;
          typicalEducation = Career.SocialWork.typicalEducation;
          matchReasons = "Apply your critical thinking strengths to help people navigate life's challenges and social systems.";
        },
        {
          careerTitle = Career.Business.title;
          description = Career.Business.description;
          requiredSkills = Career.Business.requiredSkills;
          typicalEducation = Career.Business.typicalEducation;
          matchReasons = "Business and management roles provide a stable path to apply organizational, analytical, and leadership skills without heavy math focus.";
        },
      ];
    } else if (surveyResults.itSkills > 3) {
      ?[
        {
          careerTitle = Career.IT.title;
          description = Career.IT.description;
          requiredSkills = Career.IT.requiredSkills;
          typicalEducation = Career.IT.typicalEducation;
          matchReasons = "Your strengths in IT and math make you a great fit for high-paying tech careers with abundant opportunities.";
        },
        {
          careerTitle = Career.Mathematics.title;
          description = Career.Mathematics.description;
          requiredSkills = Career.Mathematics.requiredSkills;
          typicalEducation = Career.Mathematics.typicalEducation;
          matchReasons = "Your math and analytical skills are suited for high-demand careers in science, finance, and technology.";
        },
        {
          careerTitle = Career.Business.title;
          description = Career.Business.description;
          requiredSkills = Career.Business.requiredSkills;
          typicalEducation = Career.Business.typicalEducation;
          matchReasons = "Business and management provide highly paid roles, especially for those with strong analytical and leadership abilities.";
        },
      ];
    } else if (surveyResults.mathSkills > 3) {
      ?[
        {
          careerTitle = Career.Mathematics.title;
          description = Career.Mathematics.description;
          requiredSkills = Career.Mathematics.requiredSkills;
          typicalEducation = Career.Mathematics.typicalEducation;
          matchReasons = "Great math skills open doors to well-paying roles in engineering, research, and data analysis.";
        },
        {
          careerTitle = Career.HealthCare.title;
          description = Career.HealthCare.description;
          requiredSkills = Career.HealthCare.requiredSkills;
          typicalEducation = Career.HealthCare.typicalEducation;
          matchReasons = "Healthcare careers combine analytical and interpersonal skills, offering high pay and job security.";
        },
        {
          careerTitle = Career.Business.title;
          description = Career.Business.description;
          requiredSkills = Career.Business.requiredSkills;
          typicalEducation = Career.Business.typicalEducation;
          matchReasons = "Strong analytical skills can boost advancement in business roles, leading to higher salaries and career growth.";
        },
      ];
    } else if (
      surveyResults.socialProblemSolving >= 2 and
      (surveyResults.selfReflection >= 2 or surveyResults.careerSatisfaction >= 2 or surveyResults.requirementsClarity >= 2)
    ) {
      ?[
        {
          careerTitle = Career.HealthCare.title;
          description = Career.HealthCare.description;
          requiredSkills = Career.HealthCare.requiredSkills;
          typicalEducation = Career.HealthCare.typicalEducation;
          matchReasons = "Transform your personal experiences into a successful healthcare career, driven by empathy and a desire to help others.";
        },
        {
          careerTitle = Career.SocialWork.title;
          description = Career.SocialWork.description;
          requiredSkills = Career.SocialWork.requiredSkills;
          typicalEducation = Career.SocialWork.typicalEducation;
          matchReasons = "Help others overcome life's challenges while developing a rewarding career in social support and community services.";
        },
      ];
    } else {
      ?[
        {
          careerTitle = Career.IT.title;
          description = Career.IT.description;
          requiredSkills = Career.IT.requiredSkills;
          typicalEducation = Career.IT.typicalEducation;
          matchReasons = "Your skills and interests are well-suited for the flexible tech industry, which offers high salaries and diverse opportunities.";
        },
        {
          careerTitle = Career.Mathematics.title;
          description = Career.Mathematics.description;
          requiredSkills = Career.Mathematics.requiredSkills;
          typicalEducation = Career.Mathematics.typicalEducation;
          matchReasons = "Develop your analytical skills through math-related careers, where demand is high across various industries.";
        },
        {
          careerTitle = Career.HealthCare.title;
          description = Career.HealthCare.description;
          requiredSkills = Career.HealthCare.requiredSkills;
          typicalEducation = Career.HealthCare.typicalEducation;
          matchReasons = "Healthcare careers are consistently in demand, offering stable, high-paying jobs that make a real difference.";
        },
        {
          careerTitle = Career.Business.title;
          description = Career.Business.description;
          requiredSkills = Career.Business.requiredSkills;
          typicalEducation = Career.Business.typicalEducation;
          matchReasons = "Learn business skills for a successful career in practical and adaptable roles. These skills are universally applicable and valuable in any industry.";
        },
      ];
    };
  };

  public shared ({ caller }) func getTotalQuestionCount() : async Nat {
    20;
  };

  public shared ({ caller }) func checkRequirements(requirementsClarity : ?Nat, _language : ?Text) : async ?CareerMatchExplanation {
    let language = switch (_language) {
      case (?l) { l };
      case (null) { "en" };
    };
    let clarity = switch (requirementsClarity) {
      case (?c) { c };
      case (null) { 1 };
    };
    if (clarity >= 75) {
      let healthcareExplanation = {
        careerTitle = Career.HealthCare.title;
        description = Career.HealthCare.description;
        requiredSkills = Career.HealthCare.requiredSkills;
        typicalEducation = Career.HealthCare.typicalEducation;
        matchReasons = (
          "Based on your survey results, you have a great fit for the required skills, education, and pay for a career in: " #
          Career.HealthCare.title #
          "."
        );
      };
      var message = (
        "To work in: " # Career.HealthCare.title # " " # healthcareExplanation.description 
        # "\n\n" # Career.HealthCare.title 
        # " requires: " # Career.HealthCare.typicalEducation 
        # "\n\n" # "Reward: " # Career.HealthCare.description 
        # "\n\n" # "Your skill requirements have a: " # clarity.toText() # " percent fit."
        # "\n\n" # "This profession is: " # Career.HealthCare.title # " " 
        # healthcareExplanation.description # "\n\n"
        # "Other advantages include strong job satisfaction, job security, and high-quality working conditions."
        # "\n\n" # "Recommended career survey tests:"
        # "\n[Education Test]"
        # "\n[Salary Benchmark Test (for this career)]"
        # "\n\n" # "Job offers for " #
          Career.HealthCare.title #
          " often exceed 100,000 Euros per year and offer a high fit to your requirements given the job security and growing demand for new specialists."
      );
      if (language != "en") {
        let _message = message;
        message := "TO TRANSLATE: " # _message # " FROM EN LANGUAGE: "#language;
      };
      ?{
        careerTitle = Career.HealthCare.title;
        description = message;
        requiredSkills = Career.HealthCare.requiredSkills;
        typicalEducation = Career.HealthCare.typicalEducation;
        matchReasons = "matchReason";
      };
    } else {
      let healthcareExplanation = {
        careerTitle = Career.HealthCare.title;
        description = Career.HealthCare.description;
        requiredSkills = Career.HealthCare.requiredSkills;
        typicalEducation = Career.HealthCare.typicalEducation;
        matchReasons = "Based on your survey results, you have a great fit for the required skills, education, and pay for a career in: " # Career.HealthCare.title # ".";
      };

      let socialWorkExplanation = {
        careerTitle = Career.SocialWork.title;
        description = Career.SocialWork.description;
        requiredSkills = Career.SocialWork.requiredSkills;
        typicalEducation = Career.SocialWork.typicalEducation;
        matchReasons = "With a lower requirements clarity score (" # clarity.toText() # "), you may benefit from exploring fields with more flexible options and hands-on experience.";
      };

      let message = (
        "Your fit for: " # Career.HealthCare.title # " is currently " # clarity.toText() #
        " out of 100 percent. Alternative careers, such as Social Work, offer greater flexibility in job variations, education and training, and possible entry without formal training. Job offers are also high."
        # "\n\n" # "Other advantages include job satisfaction, job security, and good pay."
        # "\n\n" # "Further recommendations:"
        # "\n[Education Test]"
        # "\n[Career and Salary Test]"
        # "\n[Life Satisfaction Test]"
      );

      let _message = message;
      let translatedMessage = if (language != "en") {
        "TO TRANSLATE: " # _message # " FROM EN";
      } else {
        message;
      };

      ?{
        careerTitle = Career.HealthCare.title;
        description = translatedMessage;
        requiredSkills = Career.HealthCare.requiredSkills;
        typicalEducation = Career.HealthCare.typicalEducation;
        matchReasons = "matchReason";
      };
    };
  };

  func getIntroductionResponse() : Text {
    "Hello! I can help guide you to a fulfilling career based on your interests. What areas are you most curious about? You can start by mentioning skills you enjoy, industries you've considered, or what motivates you.";
  };

  func getSkillsFollowup(interests : Text) : Text {
    "Thank you for sharing your interests in " # interests # ". What are some skills you have or want to develop? For example, communication, problem-solving, analytical thinking, creative writing, teamwork, leadership...";
  };

  func getCareerExplanations(careers : [CareerMatchExplanation]) : Text {
    var response = "Thank you for your answers! Based on your responses, I'd recommend these career paths:\n";
    for (career in careers.values()) {
      response #= "---------------\n";
      response #= career.careerTitle # "\n";
      response #= career.description # "\n";
      response #= "Required Skills: " # formatSkillsArray(career.requiredSkills) # "\n";
      response #= "Typical Education: " # career.typicalEducation # "\n";
      response #= "Why this fits you: " # career.matchReasons # "\n\n";
    };
    response # "Let me know if you'd like a deeper dive on any of these or have more questions!";
  };

  func formatSkillsArray(skills : [Text]) : Text {
    switch (skills.size()) {
      case (0) { "" };
      case (1) { skills[0] };
      case (_) {
        var formatted = "";
        var i = 0;
        while (i < skills.size()) {
          formatted #= skills[i];
          if (i != skills.size() - 1) {
            formatted #= ", ";
          };
          i += 1;
        };
        formatted;
      };
    };
  };

  func getCareerActivitiesGuidance(careerTitle : Text) : Text {
    "Great choice! To prepare for a future in " # careerTitle # ", consider the following:\nPractice projects and internships.\nTake relevant online courses.\nNetwork with professionals in the field.\nStay updated on industry trends.\nRemember, continuous learning and adaptability are key to success. ";
  };

  func getConversationContext(history : [ChatMessage]) : Text {
    var context = "";
    for (msg in history.values()) {
      context #= "-------\n";
      context #= (if (msg.isUser) { "User" } else { "AI" }) # ": " # msg.message;
    };
    context;
  };

  func addCareerMessage(conversationId : Text, message : ChatMessage) {
    let assistantMessages = switch (careerMessages.get(conversationId)) {
      case (null) { [] };
      case (?messages) { messages };
    };
    careerMessages.add(conversationId, assistantMessages.concat([message]));
  };

  public shared ({ caller }) func startCareerChat(conversationId : Text) : async Text {
    addCareerMessage(conversationId, { isUser = false; message = getIntroductionResponse() });
    getIntroductionResponse();
  };

  public shared ({ caller }) func handleCareerRequest(conversationId : Text, userInput : Text) : async Text {
    let history = careerMessages.get(conversationId);
    switch (history) {
      case (?msgs) {
        let lastMsg = if (msgs.size() > 0) { ?msgs[msgs.size() - 1] } else { null };
        switch (lastMsg) {
          case (null) { Runtime.trap("No previous message found") };
          case (?last) {
            if (not last.isUser) {
              return "Sorry, I didn't catch your previous message. What would you like to discuss regarding career opportunities?";
            } else if (last.message.contains(#text "interested in")) {
              let response = getSkillsFollowup(userInput);
              addCareerMessage(conversationId, { isUser = false; message = response });
              response;
            } else if (last.message.contains(#text "skills") or last.message.contains(#text "honestly not sure")) {
              let careerMatches = [
                {
                  careerTitle = Career.IT.title;
                  description = Career.IT.description;
                  requiredSkills = Career.IT.requiredSkills;
                  typicalEducation = Career.IT.typicalEducation;
                  matchReasons = "Your skills are a good fit for IT.";
                },
                {
                  careerTitle = Career.Mathematics.title;
                  description = Career.Mathematics.description;
                  requiredSkills = Career.Mathematics.requiredSkills;
                  typicalEducation = Career.Mathematics.typicalEducation;
                  matchReasons = "Your math skills align well with analytical fields.";
                },
              ];
              let response = getCareerExplanations(careerMatches);
              addCareerMessage(conversationId, { isUser = false; message = response });
              response;
            } else if (userInput.contains(#text "learn more") or userInput.contains(#text "preparation") or userInput.contains(#text "tips")) {
              let response = getCareerActivitiesGuidance(".net development");
              addCareerMessage(conversationId, { isUser = false; message = response });
              response;
            } else {
              let fallbackResponse = "I'm here to help you find the right career path. Could you please clarify your interests or skills?";
              addCareerMessage(conversationId, { isUser = false; message = fallbackResponse });
              fallbackResponse;
            };
          };
        };
      };
      case (null) {
        let initialResponse = getIntroductionResponse();
        addCareerMessage(conversationId, { isUser = false; message = initialResponse });
        initialResponse;
      };
    };
  };

  public query ({ caller }) func getCareerMessages(conversationId : Text) : async [ChatMessage] {
    switch (careerMessages.get(conversationId)) {
      case (null) { [] };
      case (?messages) { messages };
    };
  };

  public type SaveCompletionInput = {
    surveyId : Text;
    surveyType : SurveyType;
  };

  public shared ({ caller }) func getCompletionStatus({
    conversationId : Text;
    surveyType : SurveyType;
  }) : async Bool {
    switch (completionMessages.get(conversationId)) {
      case (null) { false };
      case (?completion) { completion };
    };
  };

  public shared ({ caller }) func clearCareerContent() : async () {
    careerMessages.clear();
  };
};
