---
marp: true
theme: tailwind
footer: '**QIBA - Module 8**<br>Business Writing'
---

<script src="./themes/timer.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
<script src="./themes/charts.js"></script>

<!-- 
_class: title
-->

# Module 8: Simmons Medical Practice - Project Breakdown

---

<!-- 
footer: ""
 -->

# About Simmons Medical Practice

- Established by Dr. Paul Simmons in 2004.
- Strong reputation in the medical community.
- Serves a diverse patient population.
- Dedicated team of medical and administrative staff.
- Offers a wide range of services to meet the healthcare needs of the community.
- Known for its personalised approach to patient care.
- Focus on delivering high-quality services.

---

# Identified Challenges

- **Outdated IT Infrastructure**: The clinic's hardware and software systems are outdated, lacking scalability, reliability, and security.
- **Lack of Integration**: Disconnected accounting and patient management systems lead to data silos and inefficiencies.
- **Data Security Risks**: In-house data storage and IT maintenance by Dr. Simmons pose security risks and compliance challenges.
- **Limited Automation**: The Patient Management System lacks automation features, affecting patient engagement and care delivery.

---

# Strategic Objectives

| **Objective**                     | **Description**                                               | **Recommendations**                                              | **Example Services**                  |
| --------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| **IT Infrastructure Upgrade**     | Upgrade IT for better reliability, security, and performance. | - Cloud storage & backup<br>- Network upgrade<br>- Cybersecurity | Microsoft Azure, AWS, VPNs, RDS       |
| **Accounting System Integration** | Streamline financial processes and integrate systems.         | - Cloud accounting<br>- API integration<br>- Staff training      | Xero, QuickBooks Online               |
| **Data Security Enhancement**     | Improve data protection and ensure compliance.                | - Encryption<br>- Backup & disaster recovery<br>- Compliance     | AWS KMS, Veeam, Acronis               |
| **Patient Management Automation** | Automate patient engagement and communication.                | - Appointment reminders<br>- Patient portal or mobile app        | AWS SNS, Twilio, HealthEngine, HotDoc |

---

# VitaLink Competencies

<div class='grid grid-cols-3 gap-2 text-sm'>

> [!CARD] **Competitive Advantage**  
> - Specialised healthcare IT expertise  
> - Tailored solutions for clinic needs  
> - Proven success in healthcare IT projects  
> - Access to cutting-edge technologies

> [!CARD] **Team Qualifications**  
> - Certified IT professionals  
> - Expertise in cloud computing, data security, and system integration  
> - Dedicated project managers ensuring quality and success

> [!CARD] **Success Stories**  
> - Endorsed by AMA & RACGP  
> - Case studies showing cost reduction, increased patient engagement, and enhanced data security

</div>

---

# Testimonials

<div class='grid grid-cols-3 gap-2'>

![Testimonial 1](./Frame_2.png)

![Testimonial 2](./Frame_3.png)

![Testimonial 3](./Frame_4.png)

</div>

---

# Project Milestones

<div class='text-sm'>

| **Milestone**                  | **Time**    | **Key Activities**                                                          |
| ------------------------------ | ----------- | --------------------------------------------------------------------------- |
| **Discovery & Assessment**     | Month 1     | On-site reviews, staff interviews, and data security audits.                |
| **Solution Design & Planning** | Months 2-3  | Design upgrades, integrations, and project planning with timelines.         |
| **Acquisition & Setup**        | Months 4-6  | Procure hardware, configure cloud services, and set up secure environments. |
| **Development & Testing**      | Months 7-11 | Build custom solutions, test integrations, and conduct quality assurance.   |
| **Training & Handover**        | Month 12    | Train staff, provide documentation, and ensure ongoing support.             |

</div>

---

# Launch Cost

| **Objective**                            | **Cost Range**    |
| ---------------------------------------- | ----------------- |
| **IT Infrastructure Upgrade**            | $30,000 - $50,000 |
| **Accounting System Integration**        | $15,000 - $25,000 |
| **Data Security Enhancement**            | $15,000 - $25,000 |
| **Patient Management System Automation** | $30,000 - $40,000 |
| **Training and Handover**                | $2,000 - $5,000   |

**Total Estimated Cost**: $100,000 - $150,000

---

# Operational Cost

| **Service**                | **Monthly Cost** |
| -------------------------- | ---------------- |
| **Cloud-based services**   | $250 - $500      |
| **Domain and hosting**     | $50 - $100       |
| **Software subscriptions** | $100 - $200      |

**Estimated Monthly Total**: $400 - $800

---

# Conclusion & Next Steps

This proposal presents VitaLink's IT solutions to enhance Simmons Medical Practice’s operational efficiency, data security, and patient care.

**Next Steps**:
1. **Consultation**: Refine project scope, timeline, and budget.
2. **Review**: Approve solutions, cost breakdown, and implementation plan.
3. **Contract Negotiation**: Finalise service agreements, including guarantees and SLAs.

To proceed, please contact us at [projects@vitalink.com.au](mailto:projects@vitalink.com.au) to schedule a detailed consultation. We look forward to collaborating with Simmons Medical Practice!


<!-- 
# Line Chart

<div class='data-table' data-chart-type='line' style='height: 75vh'>

**Monthly Revenue**

| Month | Dataset 1 | Dataset 2 |
| ----- | --------- | --------- |
| Jan   | 10        | 20        |
| Feb   | 15        | 25        |
| Mar   | 20        | 30        |
| Apr   | 25        | 35        |
| May   | 30        | 40        |
| Jun   | 35        | 45        |
| Jul   | 40        | 50        |
| Aug   | 45        | 55        |
| Sep   | 50        | 60        |
| Oct   | 55        | 65        |

</div>

---

# Bar Chart

<div class='data-table' data-chart-type='bar' style='height: 75vh'>

**Monthly Revenue**

| Month | Dataset 1 | Dataset 2 |
| ----- | --------- | --------- |
| Jan   | 10        | 20        |
| Feb   | 15        | 25        |
| Mar   | 20        | 30        |
| Apr   | 25        | 35        |
| May   | 30        | 40        |
| Jun   | 35        | 45        |
| Jul   | 40        | 50        |
| Aug   | 45        | 55        |
| Sep   | 50        | 60        |
| Oct   | 55        | 65        |

</div>


---

# SWOT Analysis

<div class="chart-container" style="position: relative; height:75vh;">
    <canvas id="myChart"></canvas>
</div>

<script>
  const colors = {
    strengths: {
      backgroundColor: 'rgb(255, 99, 132.2)',
      borderColor: 'rgb(255, 99, 132)',
    }
  }

  const ctx = document.getElementById('myChart');
const data = {
  "datasets": [
    {
      "label": "Strengths",
      "data": [
        { "x": -0.1, "y": 0.9, "title": "Reputation", "description": "Established medical practice with a strong reputation." },
        { "x": -0.1, "y": 0.8, "title": "Ownership of premises", "description": "Ownership of the premises provides stability and control." },
        { "x": -0.45, "y": 0.1, "title": "Equipment", "description": "Specialised medical equipment enhances patient care." },
        { "x": -0.5, "y": 0.5, "title": "Dedicated Staff", "description": "Dedicated staff members with a mix of medical and administrative roles." },
        { "x": -0.9, "y": 0.1, "title": "IT Infrastructure control", "description": "In-house IT maintenance and data storage for better control and security." },
        { "x": -0.4, "y": 0.4, "title": "Bulk billing", "description": "Bulk billing system for patient convenience." },
        { "x": -0.1, "y": 0.1, "title": "Specialists", "description": "Visiting specialists add value to the clinic's services." }
      ],
      "backgroundColor": "rgb(75, 192, 192)",
      "borderColor": "rgb(75, 192, 192)"
    },
    {
      "label": "Weaknesses",
      "data": [
        { "x": -0.45, "y": -0.1, "title": "Leased equipment", "description": "Reliance on expensive leased specialist medical equipment." },
        { "x": -0.3, "y": -0.8, "title": "Unreliable IT infrastructure", "description": "Potential challenges in IT network reliability." },
        { "x": -0.4, "y": -0.7, "title": "Lack of integration", "description": "Complex accounting software and lack of integration with patient management system." },
        { "x": -0.5, "y": -0.6, "title": "Limited automation", "description": "Manual appointment reminders without automation." },
        { "x": -0.9, "y": -0.9, "title": "Overworked owner", "description": "Dr Simmons's responsibility for all IT maintenance, data storage, and consumables." }
      ],
      "backgroundColor": "rgb(255, 99, 132)",
      "borderColor": "rgb(255, 99, 132)"
    },
    {
      "label": "Opportunities",
      "data": [
        { "x": 0.1, "y": 0.85, "title": "Collaboration", "description": "Collaboration with other healthcare providers for integrated care." },
        { "x": 0.5, "y": 0.5, "title": "Expansion of services", "description": "Adding new services such as physical therapy, mental health counseling, or specialized clinics (e.g., diabetic care, pediatric care) can attract a broader patient base" },

      ],
      "backgroundColor": "rgb(54, 162, 235)",
      "borderColor": "rgb(54, 162, 235)"
    },
    {
      "label": "Threats",
      "data": [
        { "x": 0.6, "y": -0.9, "title": "Disruption", "description": "Disruption of services due to IT system failures or downtime." },
        { "x": 0.7, "y": -0.8, "title": "Infrastructure damage", "description": "Damage to equipment or premises affecting clinic operations." },
        { "x": 0.8, "y": -0.7, "title": "Cyber threats", "description": "Data breaches and cyber attacks on patient information." },
        { "x": 0.9, "y": -0.6, "title": "Competition", "description": "Competition from other medical practices and healthcare providers." },
        { "x": 0.5, "y": -0.5, "title": "Rising Costs", "description": "Rising costs of medical equipment and technology upgrades." },
        { "x": 0.4, "y": -0.4, "title": "Patient Dissatisfaction", "description": "Patient dissatisfaction with service quality and waiting times." }
      ],
      "backgroundColor": "rgb(255, 206, 86)",
      "borderColor": "rgb(255, 206, 86)"
    }
  ]
};

  const quadrants = {
    id: 'quadrants',
    beforeDraw(chart, args, options) {
      const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
      const midX = x.getPixelForValue(0);
      const midY = y.getPixelForValue(0);
      ctx.save();
      ctx.fillStyle = options.topLeft;
      ctx.fillRect(left, top, midX - left, midY - top);
      ctx.fillStyle = options.topRight;
      ctx.fillRect(midX, top, right - midX, midY - top);
      ctx.fillStyle = options.bottomRight;
      ctx.fillRect(midX, midY, right - midX, bottom - midY);
      ctx.fillStyle = options.bottomLeft;
      ctx.fillRect(left, midY, midX - left, bottom - midY);
      ctx.restore();
    }
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      plugins: {
        quadrants: {
          bottomLeft: 'rgb(255, 204, 204)', // red
          topRight: 'rgb(204, 230, 255)', // blue
          topLeft: 'rgb(217, 235, 235)', // green
          bottomRight: 'rgb(255, 243, 204)', // yellow
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function(context) {
                    return context.dataset.data[context.dataIndex].description;
                }
            }
        },
        datalabels: {
          display: true,
          formatter: function(value, context) {
            return context.dataset.data[context.dataIndex].title;
          },
          align: 'bottom',
        }
      },
      aspectRatio: 1,
      // Limit the range to -1 to 1
      scales: {
        x: {
          min: -1,
          max: 1,
          ticks: {
            callback: function(value) {
              if (value === -1) {
                return 'Internal';
              } else if (value === 1) {
                return 'External';
              }
            }
          }
        },
        y: {
          min: -1,
          max: 1,
          ticks: {
            callback: function(value) {
              if (value === -1) {
                return 'Harmful';
              } else if (value === 1) {
                return 'Beneficial';
              }
            }
          }
        }
      }
    },
    plugins: [quadrants, ChartDataLabels]
  };

  new Chart(ctx, config);
</script> -->