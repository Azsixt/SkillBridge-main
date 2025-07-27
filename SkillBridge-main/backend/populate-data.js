const fetch = require('node-fetch');

const API_BASE = 'http://localhost:4000/api';

// Sample data
const instructors = [
    { name: 'James Davis', email: 'james.davis@airline.com', specialties: ['Weather Systems', 'Navigation'], available: true },
    { name: 'Sarah Lee', email: 'sarah.lee@airline.com', specialties: ['Emergency Procedures', 'Decision Making'], available: true },
    { name: 'Thomas Wilson', email: 'thomas.wilson@airline.com', specialties: ['Flight Planning', 'Regulations'], available: true },
    { name: 'Robert Wilson', email: 'robert.wilson@airline.com', specialties: ['Technical Systems', 'CRM'], available: true },
    { name: 'Captain Elizabeth Morgan', email: 'elizabeth.morgan@airline.com', specialties: ['Instrument Procedures', 'Weather Systems'], available: true },
    { name: 'Captain Mark Stevens', email: 'mark.stevens@airline.com', specialties: ['Emergency Procedures', 'Manual Flying'], available: true },
    { name: 'Captain Anna Kowalski', email: 'anna.kowalski@airline.com', specialties: ['CRM', 'Decision Making'], available: true },
    { name: 'Captain Jose Martinez', email: 'jose.martinez@airline.com', specialties: ['Flight Planning', 'Navigation'], available: true }
];

const trainees = [
    { name: 'Amanda Torres', email: 'amanda.torres@airline.com', status: 'active' },
    { name: 'Robert Brown', email: 'robert.brown@airline.com', status: 'active' },
    { name: 'Michael Johnson', email: 'michael.johnson@airline.com', status: 'active' },
    { name: 'Jennifer Smith', email: 'jennifer.smith@airline.com', status: 'active' },
    { name: 'David Thompson', email: 'david.thompson@airline.com', status: 'active' },
    { name: 'Emily Chen', email: 'emily.chen@airline.com', status: 'active' },
    { name: 'Carlos Rodriguez', email: 'carlos.rodriguez@airline.com', status: 'active' },
    { name: 'Lisa Anderson', email: 'lisa.anderson@airline.com', status: 'active' },
    { name: 'Kevin Park', email: 'kevin.park@airline.com', status: 'active' },
    { name: 'Sophie Williams', email: 'sophie.williams@airline.com', status: 'active' },
    { name: 'Marco Italiano', email: 'marco.italiano@airline.com', status: 'active' },
    { name: 'Priya Sharma', email: 'priya.sharma@airline.com', status: 'active' },
    { name: 'Alex Mitchell', email: 'alex.mitchell@airline.com', status: 'active' },
    { name: 'Rachel Green', email: 'rachel.green@airline.com', status: 'active' },
    { name: 'Hassan Al-Rashid', email: 'hassan.alrashid@airline.com', status: 'active' },
    { name: 'Nina Petrov', email: 'nina.petrov@airline.com', status: 'active' },
    { name: 'Jackson Wright', email: 'jackson.wright@airline.com', status: 'active' },
    { name: 'Maria Garcia', email: 'maria.garcia@airline.com', status: 'active' },
    { name: 'Tyler Brooks', email: 'tyler.brooks@airline.com', status: 'active' },
    { name: 'Chloe Martin', email: 'chloe.martin@airline.com', status: 'active' }
];

const assessments = [
    { title: 'Weather Systems Quiz', description: 'Basic weather systems knowledge assessment', type: 'Knowledge' },
    { title: 'Navigation Assessment', description: 'Navigation procedures and instruments', type: 'Technical' },
    { title: 'Emergency Procedures', description: 'Emergency response protocols', type: 'Practical' },
    { title: 'Flight Planning', description: 'Route planning and fuel calculations', type: 'Technical' },
    { title: 'CRM Training', description: 'Crew resource management skills', type: 'Practical' }
];

async function createData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error creating ${endpoint}:`, error);
        return null;
    }
}

async function populateData() {
    console.log('🚀 Starting data population...');
    
    try {
        // Create instructors
        console.log('📚 Creating instructors...');
        const createdInstructors = [];
        for (const instructor of instructors) {
            const result = await createData('/instructors', instructor);
            if (result) {
                createdInstructors.push(result);
                console.log(`✅ Created instructor: ${instructor.name}`);
            }
        }
        
        // Create trainees
        console.log('🎓 Creating trainees...');
        const createdTrainees = [];
        for (const trainee of trainees) {
            const result = await createData('/trainees', trainee);
            if (result) {
                createdTrainees.push(result);
                console.log(`✅ Created trainee: ${trainee.name}`);
            }
        }
        
        // Create assessments
        console.log('📝 Creating assessments...');
        const createdAssessments = [];
        for (const assessment of assessments) {
            const result = await createData('/assessments', assessment);
            if (result) {
                createdAssessments.push(result);
                console.log(`✅ Created assessment: ${assessment.title}`);
            }
        }
        
        // Create assessment results
        console.log('📊 Creating assessment results...');
        for (let i = 0; i < 35; i++) {
            const trainee = createdTrainees[Math.floor(Math.random() * createdTrainees.length)];
            const assessment = createdAssessments[Math.floor(Math.random() * createdAssessments.length)];
            const score = Math.floor(Math.random() * 40) + 60; // 60-100
            
            const result = await createData('/assessment-results', {
                traineeId: trainee.id,
                assessmentId: assessment.id,
                score: score,
                completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
            });
            
            if (result) {
                console.log(`✅ Created assessment result: ${trainee.name} - ${score}%`);
            }
        }
        
        // Create pairings
        console.log('🤝 Creating pairings...');
        for (let i = 0; i < 15; i++) {
            const trainee = createdTrainees[Math.floor(Math.random() * createdTrainees.length)];
            const instructor = createdInstructors[Math.floor(Math.random() * createdInstructors.length)];
            const score = Math.floor(Math.random() * 20) + 80; // 80-100
            
            const result = await createData('/pairings', {
                traineeId: trainee.id,
                instructorId: instructor.id,
                matchScore: score,
                rationale: `Matched based on skill requirements and instructor expertise`,
                status: Math.random() > 0.3 ? 'active' : 'completed'
            });
            
            if (result) {
                console.log(`✅ Created pairing: ${trainee.name} ↔ ${instructor.name} (${score}%)`);
            }
        }
        
        console.log('🎉 Data population completed successfully!');
        
    } catch (error) {
        console.error('❌ Error during data population:', error);
    }
}

// Run the population
populateData(); 