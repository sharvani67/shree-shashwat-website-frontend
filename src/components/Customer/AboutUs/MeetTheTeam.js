import React from "react";
import "./MeetTheTeam.css";

const team = [
  {
    name: "Fanny Wu",
    role: "HR",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    desc: "Fanny ensures a positive and supportive work environment while managing recruitment and employee engagement.",
  },
  {
    name: "Dawn Koh",
    role: "CFO",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    desc: "Dawn oversees all financial operations, driving fiscal strategy and ensuring our long-term financial health.",
  },
  {
    name: "Mark Twain",
    role: "CEO",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    desc: "Mark is the visionary behind our company, steering strategy, innovation, and culture across all departments.",
  },
  {
    name: "Henry Low",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    desc: "Henry leads our tech team, focusing on product architecture, scalability, and cutting-edge innovation.",
  },
  {
    name: "Nancy Lee",
    role: "CMO",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    desc: "Nancy heads our marketing division, crafting impactful campaigns that resonate with customers globally.",
  },
];

const MeetTheTeam = () => {
  return (
    <section className="team-section">
      <h2 className="team-title">Meet the Team</h2>
      <div className="team-members">
        {team.map((member, idx) => (
          <div
            key={idx}
            className={`team-member ${member.role === "CEO" ? "ceo" : ""}`}
          >
            <div className="avatar-wrapper">
              <img src={member.image} alt={member.name} className="avatar" />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <p className="member-desc">{member.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;
