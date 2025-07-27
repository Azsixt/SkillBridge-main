$baseUrl = "http://localhost:4000/api"

Write-Host "🔄 Adding instructors..." -ForegroundColor Yellow

# Add instructors
$instructors = @(
    @{ name = "Captain John Smith"; email = "john.smith@airline.com"; specialties = @("Multi-Engine", "IFR"); available = $true },
    @{ name = "Captain Sarah Johnson"; email = "sarah.johnson@airline.com"; specialties = @("Glass Cockpit", "RNAV"); available = $true },
    @{ name = "Captain Mike Brown"; email = "mike.brown@airline.com"; specialties = @("Emergency Procedures", "CRM"); available = $true },
    @{ name = "Captain Lisa Davis"; email = "lisa.davis@airline.com"; specialties = @("Weather Systems", "Navigation"); available = $true },
    @{ name = "Captain James Wilson"; email = "james.wilson@airline.com"; specialties = @("Turbine Engines", "Systems"); available = $true }
)

foreach ($instructor in $instructors) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/instructors" -Method POST -Body ($instructor | ConvertTo-Json) -ContentType "application/json"
        Write-Host "✅ Added instructor: $($instructor.name)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error adding instructor $($instructor.name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "🔄 Adding trainees..." -ForegroundColor Yellow

# Add trainees  
$trainees = @(
    @{ name = "Robert Anderson"; email = "robert.anderson@airline.com"; instructorId = 1 },
    @{ name = "Emily Thompson"; email = "emily.thompson@airline.com"; instructorId = 1 },
    @{ name = "David Martinez"; email = "david.martinez@airline.com"; instructorId = 2 },
    @{ name = "Jessica Garcia"; email = "jessica.garcia@airline.com"; instructorId = 2 },
    @{ name = "Michael Rodriguez"; email = "michael.rodriguez@airline.com"; instructorId = 3 },
    @{ name = "Ashley Johnson"; email = "ashley.johnson@airline.com"; instructorId = 3 },
    @{ name = "Christopher Lee"; email = "christopher.lee@airline.com"; instructorId = 4 },
    @{ name = "Amanda White"; email = "amanda.white@airline.com"; instructorId = 4 },
    @{ name = "Matthew Harris"; email = "matthew.harris@airline.com"; instructorId = 5 },
    @{ name = "Stephanie Clark"; email = "stephanie.clark@airline.com"; instructorId = 5 },
    @{ name = "Daniel Lewis"; email = "daniel.lewis@airline.com"; instructorId = 1 },
    @{ name = "Samantha Walker"; email = "samantha.walker@airline.com"; instructorId = 2 },
    @{ name = "Ryan Hall"; email = "ryan.hall@airline.com"; instructorId = 3 },
    @{ name = "Nicole Allen"; email = "nicole.allen@airline.com"; instructorId = 4 },
    @{ name = "Kevin Young"; email = "kevin.young@airline.com"; instructorId = 5 }
)

foreach ($trainee in $trainees) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/trainees" -Method POST -Body ($trainee | ConvertTo-Json) -ContentType "application/json"
        Write-Host "✅ Added trainee: $($trainee.name)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error adding trainee $($trainee.name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 Database repopulated! Pilot selector should now work." -ForegroundColor Green
Write-Host "🌐 Refresh the page at: http://localhost:3000" -ForegroundColor Cyan 