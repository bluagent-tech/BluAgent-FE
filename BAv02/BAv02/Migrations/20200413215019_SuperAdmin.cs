using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class SuperAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "DF");

            migrationBuilder.EnsureSchema(
                name: "AC");

            migrationBuilder.EnsureSchema(
                name: "MCS150");

            migrationBuilder.EnsureSchema(
                name: "DT");

            migrationBuilder.EnsureSchema(
                name: "MT");

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionElectrical",
                columns: table => new
                {
                    idVehicleInspection = table.Column<long>(nullable: true),
                    idUser = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    idElectrical = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HeadStop = table.Column<string>(maxLength: 50, nullable: true),
                    TailDash = table.Column<string>(maxLength: 50, nullable: true),
                    TurnIndications = table.Column<string>(maxLength: 50, nullable: true),
                    AllLightDevices = table.Column<string>(maxLength: 50, nullable: true),
                    Tacnograph = table.Column<string>(maxLength: 50, nullable: true),
                    Starter = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionElectrical", x => x.idElectrical);
                });

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionFuelSystem",
                columns: table => new
                {
                    idVehicleInspection = table.Column<long>(nullable: true),
                    idUser = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    idFuelSystem = table.Column<long>(nullable: false),
                    VisibleLeak = table.Column<string>(maxLength: 50, nullable: true),
                    FuelTankFilter = table.Column<string>(maxLength: 50, nullable: true),
                    FuelTankSecurely = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionFuelSystem", x => x.idFuelSystem);
                });

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionSafe",
                columns: table => new
                {
                    idVehicleInspection = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    idUser = table.Column<long>(nullable: true),
                    idSafe = table.Column<long>(nullable: false),
                    FireExtingrisher = table.Column<string>(maxLength: 50, nullable: true),
                    FlagsFlares = table.Column<string>(maxLength: 50, nullable: true),
                    SpareBulbs = table.Column<string>(maxLength: 50, nullable: true),
                    SpareSealBeam = table.Column<string>(maxLength: 50, nullable: true),
                    Protection = table.Column<string>(maxLength: 50, nullable: true),
                    PatsVehicleConditions = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionSafe", x => x.idSafe);
                });

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionSteeringMechanism",
                columns: table => new
                {
                    idUser = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    idVehicleInspection = table.Column<long>(nullable: true),
                    idSteeringMechanism = table.Column<long>(nullable: false),
                    WheelFreePlay = table.Column<string>(maxLength: 50, nullable: true),
                    SteeringColumn = table.Column<string>(maxLength: 50, nullable: true),
                    PitmanSteering = table.Column<string>(maxLength: 50, nullable: true),
                    Nuts = table.Column<string>(maxLength: 50, nullable: true),
                    SteeringSystem = table.Column<string>(maxLength: 50, nullable: true),
                    SteeringGearBox = table.Column<string>(maxLength: 50, nullable: true),
                    BallDragLinks = table.Column<string>(maxLength: 50, nullable: true),
                    TieRodsDragLinks = table.Column<string>(maxLength: 50, nullable: true),
                    FrontAxleBean = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionSteeringMechanism", x => x.idSteeringMechanism);
                });

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionSuspension",
                columns: table => new
                {
                    IdCompany = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    IdVehicleInspection = table.Column<long>(nullable: true),
                    Id = table.Column<long>(nullable: false),
                    TurqueRadius = table.Column<string>(maxLength: 50, nullable: true),
                    SpringAssembly = table.Column<string>(maxLength: 50, nullable: true),
                    AxlePositioning = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionSuspension", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MT.VehicleInspectionTires",
                columns: table => new
                {
                    idVehicleInspection = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    Id = table.Column<long>(nullable: false),
                    TiresPowerUnit = table.Column<long>(nullable: true),
                    AllOtherTires = table.Column<string>(maxLength: 50, nullable: true),
                    Sidering = table.Column<string>(maxLength: 50, nullable: true),
                    WheelsAndRims = table.Column<string>(maxLength: 50, nullable: true),
                    Fasteners = table.Column<string>(maxLength: 50, nullable: true),
                    Welds = table.Column<string>(maxLength: 50, nullable: true),
                    FrameMembers = table.Column<string>(maxLength: 50, nullable: true),
                    TireWheelsClearance = table.Column<string>(maxLength: 50, nullable: true),
                    AdjustableAxle = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MT.VehicleInspectionTires", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "City",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 80, nullable: false),
                    IdState = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Company",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LegalName = table.Column<string>(maxLength: 200, nullable: true),
                    DbaName = table.Column<string>(maxLength: 200, nullable: true),
                    PhysicalAddress = table.Column<string>(maxLength: 300, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    PhysicalZip = table.Column<string>(maxLength: 11, nullable: true),
                    PhysicalCity = table.Column<long>(nullable: true),
                    Dot = table.Column<string>(maxLength: 12, nullable: true),
                    StateNumber = table.Column<string>(maxLength: 12, nullable: true),
                    Tax = table.Column<string>(maxLength: 16, nullable: true),
                    Region = table.Column<string>(maxLength: 15, nullable: true),
                    ScacCode = table.Column<string>(maxLength: 10, nullable: true),
                    Saat = table.Column<string>(maxLength: 10, nullable: true),
                    Rfc = table.Column<string>(maxLength: 14, nullable: true),
                    SelloCfdi = table.Column<string>(maxLength: 100, nullable: true),
                    LlaveCfdi = table.Column<string>(maxLength: 100, nullable: true),
                    Regimen = table.Column<string>(maxLength: 20, nullable: true),
                    UserSAT = table.Column<string>(maxLength: 20, nullable: true),
                    PasswordSAT = table.Column<string>(maxLength: 50, nullable: true),
                    PINNumber = table.Column<string>(maxLength: 20, nullable: true),
                    TCompany = table.Column<string>(maxLength: 15, nullable: true),
                    Hazmat = table.Column<bool>(nullable: true),
                    PhysicalStatus = table.Column<string>(maxLength: 10, nullable: true),
                    Image = table.Column<string>(maxLength: 100, nullable: true),
                    MailAddress = table.Column<string>(maxLength: 300, nullable: true),
                    DER = table.Column<string>(maxLength: 100, nullable: true),
                    Rsocial = table.Column<string>(maxLength: 200, nullable: true),
                    PhysicalState = table.Column<long>(nullable: true),
                    PhysicalCountry = table.Column<long>(nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Mcs150Date = table.Column<DateTime>(type: "date", nullable: true),
                    Mcs150Mileage = table.Column<string>(maxLength: 100, nullable: true),
                    Mcs150MYear = table.Column<string>(maxLength: 100, nullable: true),
                    AddDate = table.Column<DateTime>(type: "date", nullable: true),
                    Powerunit = table.Column<int>(nullable: true),
                    DriverTotal = table.Column<int>(nullable: true),
                    PcFlag = table.Column<string>(maxLength: 1, nullable: true),
                    CarrierOperation = table.Column<string>(maxLength: 1, nullable: true),
                    DrugsPolicy = table.Column<string>(maxLength: 25, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: true),
                    McMx = table.Column<string>(maxLength: 10, nullable: true),
                    Title = table.Column<string>(maxLength: 30, nullable: true),
                    MailZip = table.Column<string>(maxLength: 7, nullable: true),
                    MailCity = table.Column<long>(nullable: true),
                    MailState = table.Column<long>(nullable: true),
                    MailCountry = table.Column<long>(nullable: true),
                    MovilPhone = table.Column<string>(maxLength: 25, nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "date", nullable: true),
                    CustomerId = table.Column<string>(unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Country",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 80, nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Crash",
                schema: "AC",
                columns: table => new
                {
                    idCrash = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ReportNumber = table.Column<string>(maxLength: 25, nullable: false),
                    ReportSeqNo = table.Column<byte>(nullable: false),
                    DotNumber = table.Column<string>(maxLength: 20, nullable: false),
                    ReportDate = table.Column<DateTime>(type: "date", nullable: false),
                    ReportState = table.Column<string>(maxLength: 4, nullable: false),
                    Fatalities = table.Column<byte>(nullable: false),
                    Injuries = table.Column<byte>(nullable: false),
                    TowAway = table.Column<string>(maxLength: 1, nullable: false),
                    HazmatReleased = table.Column<string>(maxLength: 1, nullable: true),
                    TrafficDesc = table.Column<string>(maxLength: 50, nullable: true),
                    AccessControlDesc = table.Column<string>(maxLength: 30, nullable: true),
                    RoadSurfaceConditionDesc = table.Column<string>(maxLength: 30, nullable: true),
                    WeatherConditionDesc = table.Column<string>(maxLength: 30, nullable: true),
                    LightConditionDesc = table.Column<string>(maxLength: 40, nullable: true),
                    Vin = table.Column<string>(maxLength: 20, nullable: true),
                    VehicleLinceseNumber = table.Column<string>(maxLength: 10, nullable: true),
                    VehicleLinceseState = table.Column<string>(maxLength: 4, nullable: true),
                    SeverityWeight = table.Column<byte>(nullable: true),
                    TimeWeight = table.Column<byte>(nullable: true),
                    CitationIssuedDesc = table.Column<string>(maxLength: 10, nullable: true),
                    SeqNum = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crash", x => x.idCrash);
                });

            migrationBuilder.CreateTable(
                name: "State",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 80, nullable: false),
                    IdCountry = table.Column<long>(nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_State", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrafficConvictions",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    idDriver = table.Column<long>(nullable: false),
                    Locations = table.Column<string>(maxLength: 200, nullable: false),
                    ConvictionDate = table.Column<DateTime>(type: "date", nullable: false),
                    Change = table.Column<string>(maxLength: 200, nullable: false),
                    Penalty = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrafficConvictions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsDot",
                schema: "AC",
                columns: table => new
                {
                    DotNumber = table.Column<string>(maxLength: 20, nullable: false),
                    LegalName = table.Column<string>(maxLength: 200, nullable: true),
                    DbaName = table.Column<string>(maxLength: 200, nullable: true),
                    CarrierOperation = table.Column<string>(maxLength: 1, nullable: true),
                    HmFlag = table.Column<string>(maxLength: 1, nullable: true),
                    PcFlag = table.Column<string>(maxLength: 1, nullable: true),
                    PhyStreet = table.Column<string>(maxLength: 200, nullable: true),
                    PhyCity = table.Column<string>(maxLength: 50, nullable: true),
                    PhyState = table.Column<string>(maxLength: 30, nullable: true),
                    PhyZip = table.Column<string>(maxLength: 20, nullable: true),
                    PhyContry = table.Column<string>(maxLength: 7, nullable: true),
                    Telephone = table.Column<string>(maxLength: 25, nullable: true),
                    EmailAddress = table.Column<string>(maxLength: 50, nullable: true),
                    Mcs150Date = table.Column<DateTime>(type: "date", nullable: true),
                    Mcs150Mileage = table.Column<string>(maxLength: 20, nullable: true),
                    Mcs150MileageYear = table.Column<string>(maxLength: 6, nullable: true),
                    AddDate = table.Column<DateTime>(type: "date", nullable: true),
                    NbrPowerUnit = table.Column<string>(maxLength: 5, nullable: true),
                    DriverTotal = table.Column<string>(maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsDot", x => x.DotNumber);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Birthdate = table.Column<DateTime>(type: "date", nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    Role = table.Column<string>(maxLength: 10, nullable: false),
                    Password = table.Column<byte[]>(nullable: false),
                    Status = table.Column<string>(maxLength: 10, nullable: false),
                    Gender = table.Column<string>(maxLength: 10, nullable: true),
                    Ia = table.Column<bool>(nullable: true),
                    MobilePhone = table.Column<string>(maxLength: 25, nullable: true),
                    FileImage = table.Column<string>(maxLength: 50, nullable: true),
                    FileSignature = table.Column<string>(maxLength: 50, nullable: true),
                    Position = table.Column<string>(maxLength: 50, nullable: true),
                    IdInquiry = table.Column<long>(nullable: true),
                    TokenCode = table.Column<Guid>(nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "date", nullable: true),
                    Hazmat = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccidentRecord",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: false),
                    DateAccident = table.Column<DateTime>(type: "date", nullable: false),
                    NatureAccident = table.Column<string>(maxLength: 200, nullable: false),
                    Fatalities = table.Column<string>(maxLength: 200, nullable: false),
                    Injuries = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccidentRecord", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnnualDMVReview",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    MotorCarrier = table.Column<string>(maxLength: 200, nullable: true),
                    DateReview = table.Column<DateTime>(type: "date", nullable: true),
                    QuestionA = table.Column<bool>(nullable: true),
                    QuestionB = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualDMVReview", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnnualDriversCertification",
                schema: "DF",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    ViolationDate = table.Column<DateTime>(type: "date", nullable: true),
                    Offense = table.Column<string>(maxLength: 200, nullable: true),
                    Location = table.Column<string>(maxLength: 150, nullable: true),
                    TypeVehicleOperated = table.Column<string>(maxLength: 50, nullable: true),
                    Status = table.Column<string>(maxLength: 15, nullable: true),
                    CertificationDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualDriversCertification", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "DMV",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DMV = table.Column<string>(maxLength: 15, nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "date", nullable: true),
                    DmvFileName = table.Column<string>(maxLength: 50, nullable: true),
                    idDriver = table.Column<long>(nullable: true),
                    IssueDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DMV", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Driver",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdUser = table.Column<long>(nullable: true),
                    License = table.Column<string>(maxLength: 12, nullable: true),
                    LicenseExpiration = table.Column<DateTime>(type: "date", nullable: true),
                    StateLicense = table.Column<long>(nullable: true),
                    TypeLicense = table.Column<string>(maxLength: 20, nullable: true),
                    ContactNumber = table.Column<string>(maxLength: 25, nullable: true),
                    Status = table.Column<string>(maxLength: 10, nullable: true),
                    StatusWork = table.Column<bool>(nullable: true),
                    EmployeeID = table.Column<string>(maxLength: 35, nullable: true),
                    Ssn = table.Column<string>(maxLength: 15, nullable: true),
                    Twic = table.Column<string>(maxLength: 15, nullable: true),
                    TwicExp = table.Column<DateTime>(type: "date", nullable: true),
                    Fast = table.Column<string>(maxLength: 15, nullable: true),
                    FastExp = table.Column<DateTime>(type: "date", nullable: true),
                    MxTag = table.Column<string>(maxLength: 15, nullable: true),
                    MxTagExp = table.Column<DateTime>(type: "date", nullable: true),
                    UsaTag = table.Column<string>(maxLength: 15, nullable: true),
                    UsaTagExp = table.Column<DateTime>(type: "date", nullable: true),
                    TypeTrailer = table.Column<string>(maxLength: 15, nullable: true),
                    BusCarrier = table.Column<string>(maxLength: 15, nullable: true),
                    DeniedLicense = table.Column<string>(maxLength: 2, nullable: true),
                    LicenseSuspended = table.Column<string>(maxLength: 2, nullable: true),
                    DeniedLicenseComments = table.Column<string>(maxLength: 200, nullable: true),
                    LicenseSuspendedComments = table.Column<string>(maxLength: 200, nullable: true),
                    Roadtest = table.Column<string>(maxLength: 200, nullable: true),
                    LicenseFile = table.Column<string>(maxLength: 50, nullable: true),
                    RoadtestDate = table.Column<DateTime>(type: "date", nullable: true),
                    QuestionDA = table.Column<bool>(nullable: true),
                    QuestionInterstate = table.Column<bool>(nullable: true),
                    QuestionDMV = table.Column<bool>(nullable: true),
                    QuestionIntrastate = table.Column<bool>(nullable: true),
                    QuestionDR = table.Column<bool>(nullable: true),
                    QuestionHS = table.Column<bool>(nullable: true),
                    QuestionHm = table.Column<bool>(nullable: true),
                    QuestionWithin = table.Column<bool>(nullable: true),
                    QuestionBeyond = table.Column<bool>(nullable: true),
                    CountryLicense = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DriverAddress",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: false),
                    Street = table.Column<string>(maxLength: 200, nullable: false),
                    IdCity = table.Column<long>(nullable: true),
                    ZipCode = table.Column<string>(maxLength: 7, nullable: false),
                    DateOf = table.Column<DateTime>(type: "date", nullable: false),
                    DateTo = table.Column<DateTime>(type: "date", nullable: false),
                    CurrentAddress = table.Column<bool>(nullable: true),
                    HowLong = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverAddress", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DriverAlerts",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: false),
                    Message = table.Column<string>(maxLength: 50, nullable: true),
                    Severy = table.Column<string>(maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverAlerts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DriverDocs",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DocName = table.Column<string>(maxLength: 50, nullable: false),
                    IdDriver = table.Column<long>(nullable: true),
                    DescriptionDoc = table.Column<string>(maxLength: 40, nullable: true),
                    DateReceipt = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverDocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DrivingExperience",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    idDriver = table.Column<long>(nullable: false),
                    ClassEquipment = table.Column<string>(maxLength: 200, nullable: false),
                    TypeEquipment = table.Column<string>(maxLength: 200, nullable: false),
                    DateFrom = table.Column<DateTime>(type: "date", nullable: false),
                    DateTo = table.Column<DateTime>(type: "date", nullable: false),
                    TotalMilesDriven = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrivingExperience", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DrugAlcoholCompliance",
                schema: "DF",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: true),
                    Created = table.Column<DateTime>(type: "date", nullable: true),
                    DateApplication = table.Column<DateTime>(type: "date", nullable: true),
                    Specimen = table.Column<string>(maxLength: 15, nullable: true),
                    ResultFile = table.Column<string>(maxLength: 50, nullable: true),
                    Result = table.Column<string>(maxLength: 9, nullable: true),
                    Reason = table.Column<string>(maxLength: 30, nullable: true),
                    TypeTest = table.Column<string>(maxLength: 7, nullable: true),
                    Form = table.Column<string>(maxLength: 17, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugAlcoholCompliance", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "EmploymentApplication",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    CompanyName = table.Column<string>(maxLength: 200, nullable: true),
                    CompanyAddress = table.Column<string>(maxLength: 300, nullable: true),
                    City = table.Column<string>(maxLength: 100, nullable: true),
                    State = table.Column<string>(maxLength: 100, nullable: true),
                    ZipCode = table.Column<string>(maxLength: 100, nullable: true),
                    DriverName = table.Column<string>(maxLength: 50, nullable: true),
                    Ssn = table.Column<string>(maxLength: 15, nullable: true),
                    DriverDOB = table.Column<DateTime>(type: "date", nullable: true),
                    DriverLastName = table.Column<string>(maxLength: 50, nullable: true),
                    StateLicense = table.Column<string>(maxLength: 100, nullable: true),
                    License = table.Column<string>(maxLength: 12, nullable: true),
                    TypeLicense = table.Column<string>(maxLength: 20, nullable: true),
                    DateExpiration = table.Column<DateTime>(type: "date", nullable: true),
                    QuestionA = table.Column<string>(maxLength: 2, nullable: true),
                    QuestionB = table.Column<string>(maxLength: 2, nullable: true),
                    FileSignatureD = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploymentApplication", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmploymentHistory",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateMailed = table.Column<DateTime>(type: "date", nullable: true),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    Comment = table.Column<string>(maxLength: 200, nullable: true),
                    idEmploymentRecord = table.Column<long>(nullable: true),
                    idDriver = table.Column<long>(nullable: true),
                    Question1 = table.Column<byte>(nullable: true),
                    Question2 = table.Column<byte>(nullable: true),
                    Question3 = table.Column<byte>(nullable: true),
                    Question4 = table.Column<byte>(nullable: true),
                    Question5 = table.Column<byte>(nullable: true),
                    Question6 = table.Column<byte>(nullable: true),
                    Question7 = table.Column<byte>(nullable: true),
                    Question8 = table.Column<byte>(nullable: true),
                    Question9 = table.Column<byte>(nullable: true),
                    Quality = table.Column<byte>(nullable: true),
                    Cooperation = table.Column<byte>(nullable: true),
                    Safety = table.Column<byte>(nullable: true),
                    Personal = table.Column<byte>(nullable: true),
                    Driving = table.Column<byte>(nullable: true),
                    Attitude = table.Column<byte>(nullable: true),
                    Remarks = table.Column<string>(maxLength: 50, nullable: true),
                    RemarkQuestion6 = table.Column<string>(maxLength: 50, nullable: true),
                    Signature = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    DriverName = table.Column<string>(maxLength: 100, nullable: true),
                    ProspectiveSignature = table.Column<string>(nullable: true),
                    NewEmployerName = table.Column<string>(maxLength: 200, nullable: true),
                    NewEmployerAddress = table.Column<string>(maxLength: 500, nullable: true),
                    Application = table.Column<DateTime>(type: "date", nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    Title = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploymentHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmploymentRecords",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: false),
                    EmployerName = table.Column<string>(maxLength: 200, nullable: false),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Address = table.Column<string>(maxLength: 200, nullable: false),
                    Telephone = table.Column<string>(maxLength: 25, nullable: true),
                    PositionHeld = table.Column<string>(maxLength: 30, nullable: false),
                    DateFrom = table.Column<DateTime>(type: "date", nullable: false),
                    DateTo = table.Column<DateTime>(type: "date", nullable: false),
                    Salary = table.Column<string>(maxLength: 20, nullable: true),
                    Leaving = table.Column<string>(maxLength: 200, nullable: false),
                    SubjectToRegulation = table.Column<bool>(nullable: false),
                    SubjectToTesting = table.Column<bool>(nullable: false),
                    State = table.Column<long>(nullable: true),
                    City = table.Column<long>(nullable: true),
                    Zip = table.Column<string>(maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploymentRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LetterInquiry",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateMailed = table.Column<DateTime>(type: "date", nullable: true),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    Comment = table.Column<string>(maxLength: 200, nullable: true),
                    IdEmployeeRecord = table.Column<long>(nullable: true),
                    IdDriver = table.Column<long>(nullable: true),
                    Section382 = table.Column<bool>(nullable: true),
                    Question1 = table.Column<bool>(nullable: true),
                    Question2 = table.Column<bool>(nullable: true),
                    Question3 = table.Column<bool>(nullable: true),
                    Question4 = table.Column<bool>(nullable: true),
                    Question5 = table.Column<bool>(nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Address = table.Column<string>(maxLength: 200, nullable: true),
                    CompletedByTitle = table.Column<string>(maxLength: 20, nullable: true),
                    Signature = table.Column<string>(nullable: true),
                    SAPPhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    CompletedByName = table.Column<string>(maxLength: 100, nullable: true),
                    NewEmployerName = table.Column<string>(maxLength: 200, nullable: true),
                    NewEmployerAddress = table.Column<string>(maxLength: 500, nullable: true),
                    DriverName = table.Column<string>(maxLength: 100, nullable: true),
                    DateSent = table.Column<DateTime>(type: "date", nullable: true),
                    CompletedBySignature = table.Column<string>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LetterInquiry", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MedicalCertificate",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MedicalCertificateID = table.Column<string>(maxLength: 15, nullable: true),
                    IssueDate = table.Column<DateTime>(type: "date", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "date", nullable: true),
                    MedicalFile = table.Column<string>(maxLength: 50, nullable: true),
                    IdDriver = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalCertificate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollectionSite",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: true),
                    Fein = table.Column<string>(maxLength: 250, nullable: true),
                    AlternateBussinessIdentifier = table.Column<string>(maxLength: 250, nullable: true),
                    Address = table.Column<string>(maxLength: 250, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 250, nullable: true),
                    FaxNumber = table.Column<string>(maxLength: 250, nullable: true),
                    IsArchived = table.Column<bool>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    DateArchived = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateModified = table.Column<DateTime>(type: "datetime", nullable: true),
                    ArchivedByUserId = table.Column<long>(nullable: true),
                    ProviderId = table.Column<long>(nullable: true),
                    Discriminator = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionSite", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Collector",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: true),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    Address = table.Column<string>(maxLength: 250, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 50, nullable: true),
                    Discriminator = table.Column<string>(maxLength: 50, nullable: true),
                    CollectionSiteId = table.Column<long>(nullable: true),
                    AlcoholTestingAllowed = table.Column<bool>(nullable: true),
                    DrugTestingAllow = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collector", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollectorObservation",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DonorIdVerified = table.Column<bool>(nullable: true),
                    DonorIdRemarks = table.Column<string>(maxLength: 250, nullable: true),
                    DerVerifiedDonorIdentity = table.Column<bool>(nullable: true),
                    TempInRange = table.Column<bool>(nullable: true),
                    TempRangeRemarks = table.Column<string>(maxLength: 250, nullable: true),
                    SplitCollection = table.Column<bool>(nullable: true),
                    SplitCollectionRemarks = table.Column<string>(maxLength: 250, nullable: true),
                    Observed = table.Column<bool>(nullable: true),
                    RefusalStatusTypeId = table.Column<long>(nullable: true),
                    Remarks = table.Column<string>(maxLength: 250, nullable: true),
                    CollectorId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectorObservation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provider",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: true),
                    Fein = table.Column<string>(maxLength: 250, nullable: true),
                    AlternateBussinessIdentifier = table.Column<string>(maxLength: 250, nullable: true),
                    Address = table.Column<string>(maxLength: 250, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 250, nullable: true),
                    FaxNumber = table.Column<string>(maxLength: 250, nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    isAchived = table.Column<bool>(nullable: true),
                    DateArchived = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateModifed = table.Column<DateTime>(type: "datetime", nullable: true),
                    ArchivedByUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provider", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HazardMaterial",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HazardMaterialClasification = table.Column<string>(maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HazardMaterial", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Inspection",
                schema: "MT",
                columns: table => new
                {
                    UniqueId = table.Column<string>(maxLength: 20, nullable: false),
                    ReportNumber = table.Column<string>(maxLength: 25, nullable: false),
                    ReportState = table.Column<string>(maxLength: 4, nullable: false),
                    DotNumber = table.Column<string>(maxLength: 20, nullable: false),
                    InspDate = table.Column<DateTime>(type: "date", nullable: false),
                    InspLevelId = table.Column<string>(maxLength: 1, nullable: false),
                    CountryCodeState = table.Column<string>(maxLength: 4, nullable: false),
                    TimeWeight = table.Column<string>(maxLength: 255, nullable: true),
                    DriverOosTotal = table.Column<byte>(nullable: false),
                    VehicleOosTotal = table.Column<byte>(nullable: false),
                    TotalHazmatSent = table.Column<byte>(nullable: false),
                    OosTotal = table.Column<byte>(nullable: false),
                    HazmatOosTotal = table.Column<byte>(nullable: false),
                    HazmatPlacardReq = table.Column<string>(maxLength: 1, nullable: true),
                    UnitTypeDesc = table.Column<string>(maxLength: 20, nullable: false),
                    UnitMake = table.Column<string>(maxLength: 10, nullable: true),
                    UnitLicense = table.Column<string>(maxLength: 15, nullable: true),
                    UnitLicenseStae = table.Column<string>(maxLength: 4, nullable: true),
                    Vin = table.Column<string>(maxLength: 20, nullable: true),
                    UnitDecalNumber = table.Column<string>(maxLength: 10, nullable: true),
                    UnitTypeDesc2 = table.Column<string>(maxLength: 20, nullable: true),
                    UnitMake2 = table.Column<string>(maxLength: 10, nullable: true),
                    UnitLicense2 = table.Column<string>(maxLength: 15, nullable: true),
                    UnitLicenseState2 = table.Column<string>(maxLength: 4, nullable: true),
                    Vin2 = table.Column<string>(maxLength: 20, nullable: true),
                    UnitDecalNumber2 = table.Column<string>(maxLength: 10, nullable: true),
                    UnsafeInsp = table.Column<string>(maxLength: 1, nullable: true),
                    FatiguedInsp = table.Column<string>(maxLength: 1, nullable: true),
                    DrFitnessInsp = table.Column<string>(maxLength: 1, nullable: true),
                    SubtAlcoholInsp = table.Column<string>(maxLength: 1, nullable: true),
                    VHmaintInsp = table.Column<string>(maxLength: 1, nullable: true),
                    HmInsp = table.Column<string>(maxLength: 1, nullable: true),
                    BasicViol = table.Column<byte>(nullable: true),
                    UnsafeViol = table.Column<byte>(nullable: true),
                    FatiguedViol = table.Column<byte>(nullable: true),
                    DrFitnessViol = table.Column<byte>(nullable: true),
                    SubtAlcoholViol = table.Column<byte>(nullable: true),
                    VHmaintViol = table.Column<byte>(nullable: true),
                    HmViol = table.Column<byte>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspection", x => x.UniqueId);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceAlerts",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdVehicle = table.Column<long>(nullable: false),
                    Message = table.Column<string>(maxLength: 50, nullable: true),
                    TypeId = table.Column<string>(maxLength: 10, nullable: false),
                    Severy = table.Column<string>(maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceAlerts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceDocs",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DocName = table.Column<string>(maxLength: 100, nullable: true),
                    IdVehicle = table.Column<long>(nullable: true),
                    TypeId = table.Column<string>(maxLength: 10, nullable: true),
                    DescriptionDoc = table.Column<string>(maxLength: 100, nullable: true),
                    DocType = table.Column<string>(maxLength: 40, nullable: true),
                    URL = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceDocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trailer",
                schema: "MT",
                columns: table => new
                {
                    IdTrailer = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TrailerNumber = table.Column<string>(maxLength: 20, nullable: false),
                    Vin = table.Column<string>(maxLength: 20, nullable: false),
                    TrailerType = table.Column<string>(maxLength: 20, nullable: false),
                    Plate = table.Column<string>(maxLength: 20, nullable: false),
                    PlateState = table.Column<long>(nullable: true),
                    PlateExpiration = table.Column<DateTime>(type: "datetime", nullable: false),
                    Hazmat = table.Column<bool>(nullable: true),
                    FuelType = table.Column<string>(maxLength: 20, nullable: true),
                    Make = table.Column<string>(maxLength: 20, nullable: true),
                    Model = table.Column<string>(maxLength: 20, nullable: true),
                    Year = table.Column<string>(maxLength: 4, nullable: true),
                    InServiceDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Cost = table.Column<decimal>(type: "money", nullable: true),
                    InsuranceName = table.Column<string>(maxLength: 100, nullable: true),
                    InsuranceExpiration = table.Column<DateTime>(type: "datetime", nullable: true),
                    PolicyTerm = table.Column<string>(maxLength: 20, nullable: true),
                    PortEntry = table.Column<string>(maxLength: 100, nullable: true),
                    Weight = table.Column<int>(nullable: true),
                    OperationRadius = table.Column<string>(maxLength: 7, nullable: true),
                    SCT = table.Column<string>(maxLength: 20, nullable: true),
                    SCTExpiration = table.Column<DateTime>(type: "date", nullable: true),
                    VerificationNumber = table.Column<string>(maxLength: 20, nullable: true),
                    VerificationNumberExpiration = table.Column<DateTime>(type: "datetime", nullable: true),
                    FileImage = table.Column<string>(maxLength: 50, nullable: true),
                    Ownership = table.Column<string>(maxLength: 20, nullable: true),
                    Miles = table.Column<string>(maxLength: 50, nullable: true),
                    Engine = table.Column<string>(maxLength: 20, nullable: true),
                    Status = table.Column<string>(maxLength: 15, nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    TireSize = table.Column<int>(nullable: true),
                    OtherInsurance = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trailer", x => x.IdTrailer);
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    VehicleNumber = table.Column<string>(maxLength: 20, nullable: false),
                    Vin = table.Column<string>(maxLength: 20, nullable: false),
                    VehicleType = table.Column<string>(maxLength: 20, nullable: false),
                    Plate = table.Column<string>(maxLength: 20, nullable: false),
                    PlateState = table.Column<long>(nullable: true),
                    PlateExpiration = table.Column<DateTime>(type: "datetime", nullable: false),
                    Hazmat = table.Column<bool>(nullable: true),
                    FuelType = table.Column<string>(maxLength: 20, nullable: true),
                    Make = table.Column<string>(maxLength: 50, nullable: true),
                    Model = table.Column<string>(maxLength: 50, nullable: true),
                    Year = table.Column<string>(maxLength: 4, nullable: true),
                    InServiceDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Cost = table.Column<decimal>(type: "money", nullable: true),
                    InsuranceName = table.Column<string>(maxLength: 100, nullable: true),
                    InsuranceExpiration = table.Column<DateTime>(type: "datetime", nullable: true),
                    PolicyTerm = table.Column<string>(maxLength: 20, nullable: true),
                    PortEntry = table.Column<string>(maxLength: 100, nullable: true),
                    Weight = table.Column<int>(nullable: true),
                    OperationRadius = table.Column<string>(maxLength: 7, nullable: true),
                    Twic = table.Column<string>(maxLength: 20, nullable: true),
                    ExpTwic = table.Column<DateTime>(type: "datetime", nullable: true),
                    SCT = table.Column<string>(maxLength: 20, nullable: true),
                    SCTExpiration = table.Column<DateTime>(type: "date", nullable: true),
                    VerificationNumber = table.Column<string>(maxLength: 20, nullable: true),
                    ExpNumber = table.Column<DateTime>(type: "datetime", nullable: true),
                    FileImage = table.Column<string>(maxLength: 50, nullable: true),
                    Condition = table.Column<string>(maxLength: 20, nullable: true),
                    Miles = table.Column<string>(maxLength: 50, nullable: true),
                    Engine = table.Column<string>(maxLength: 20, nullable: true),
                    Status = table.Column<string>(maxLength: 15, nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    TireSize = table.Column<int>(nullable: true),
                    OtherInsurance = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehicleInspection",
                schema: "MT",
                columns: table => new
                {
                    idVehicle = table.Column<long>(nullable: true),
                    idCompany = table.Column<long>(nullable: true),
                    idUser = table.Column<long>(nullable: true),
                    idVehicleInspection = table.Column<long>(nullable: false),
                    InspectionType = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    TireSize = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    InspectionName = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    InspectionMeets = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    VehicleType = table.Column<string>(maxLength: 10, nullable: true),
                    InspectorSignature = table.Column<string>(maxLength: 50, nullable: true),
                    InspectionDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    DateDue = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleInspection", x => x.idVehicleInspection);
                });

            migrationBuilder.CreateTable(
                name: "VehicleInspectionBrakes",
                schema: "MT",
                columns: table => new
                {
                    ServiceBrakes = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    ParkingBrakeSystem = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    BrakeTubing = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    LowPressure = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    HydraulicBrakes = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    BrakeDrums = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    BrakeHose = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    TractorProtection = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    AirCompressor = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    VaccumSystem = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Id = table.Column<long>(nullable: false),
                    IdVehicleInspection = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleInspectionBrakes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehicleInspectionHeating",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(maxLength: 10, nullable: false),
                    IdVehicleInspection = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    Leaks = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    WornHose = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    FaultyGasket = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    MagneticClutch = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Refrigerant = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Compressor = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    FlushingContaminated = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    SystemRecharging = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleInspectionHeating", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehicleInspectionMechanical",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    IdVehicleInspection = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    FifthWheels = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    PrintieHooks = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    SafetyDevices = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    SaddleMounts = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    ExhaustedSystem = table.Column<string>(maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleInspectionMechanical", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehiculeInspectionBodyShop",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    IdVehicleInspection = table.Column<long>(nullable: true),
                    IdUser = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    WindShield_Glazing = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    WindShield_Wipers_Status = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    WindShield_Wipers_OtherStatus = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehiculeInspectionBodyShop", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Violations",
                schema: "MT",
                columns: table => new
                {
                    IdViolation = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UniqueId = table.Column<string>(maxLength: 20, nullable: false),
                    InspDate = table.Column<DateTime>(type: "date", nullable: false),
                    ViolCode = table.Column<string>(maxLength: 20, nullable: false),
                    BasicDesc = table.Column<string>(maxLength: 40, nullable: false),
                    OosIndicator = table.Column<string>(maxLength: 1, nullable: false),
                    OosWeight = table.Column<byte>(nullable: false),
                    SeverityWeight = table.Column<byte>(nullable: false),
                    TotalserverityWght = table.Column<byte>(nullable: false),
                    SectionDesc = table.Column<string>(maxLength: 200, nullable: false),
                    GroupDesc = table.Column<string>(maxLength: 50, nullable: false),
                    ViolUnit = table.Column<string>(maxLength: 1, nullable: false),
                    Status = table.Column<string>(maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Violations", x => x.IdViolation);
                });

            migrationBuilder.CreateTable(
                name: "CompanyAlerts",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCompany = table.Column<long>(nullable: true),
                    Message = table.Column<string>(maxLength: 100, nullable: true),
                    Severy = table.Column<string>(maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyAlerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CompanyAl__IdCom__5C6CB6D7",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyUsersRoles",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCompany = table.Column<long>(nullable: false),
                    IdUser = table.Column<long>(nullable: false),
                    Type = table.Column<string>(maxLength: 15, nullable: true),
                    DateStarted = table.Column<DateTime>(type: "date", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "date", nullable: true),
                    Status = table.Column<string>(maxLength: 10, nullable: false),
                    UserPermits = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyUsersRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Relations__idCom__787EE5A0",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CertificateEnrollment",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CertificateEnrollment = table.Column<string>(maxLength: 25, nullable: true),
                    EnrollmentDate = table.Column<DateTime>(type: "date", nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CertificateEnrollment", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Certifica__IdCom__382F5661",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SupervisorTraining",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(maxLength: 25, nullable: true),
                    TrainingDate = table.Column<DateTime>(type: "date", nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    SupervisorsName = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupervisorTraining", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Superviso__IdCom__3DE82FB7",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CargoClassification",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    A = table.Column<bool>(nullable: true),
                    B = table.Column<bool>(nullable: true),
                    C = table.Column<bool>(nullable: true),
                    D = table.Column<bool>(nullable: true),
                    E = table.Column<bool>(nullable: true),
                    F = table.Column<bool>(nullable: true),
                    G = table.Column<bool>(nullable: true),
                    H = table.Column<bool>(nullable: true),
                    I = table.Column<bool>(nullable: true),
                    J = table.Column<bool>(nullable: true),
                    K = table.Column<bool>(nullable: true),
                    L = table.Column<bool>(nullable: true),
                    M = table.Column<bool>(nullable: true),
                    N = table.Column<bool>(nullable: true),
                    O = table.Column<bool>(nullable: true),
                    P = table.Column<bool>(nullable: true),
                    Q = table.Column<bool>(nullable: true),
                    R = table.Column<bool>(nullable: true),
                    S = table.Column<bool>(nullable: true),
                    T = table.Column<bool>(nullable: true),
                    U = table.Column<bool>(nullable: true),
                    V = table.Column<bool>(nullable: true),
                    W = table.Column<bool>(nullable: true),
                    X = table.Column<bool>(nullable: true),
                    Y = table.Column<bool>(nullable: true),
                    Z = table.Column<bool>(nullable: true),
                    AA = table.Column<bool>(nullable: true),
                    BB = table.Column<bool>(nullable: true),
                    CC = table.Column<bool>(nullable: true),
                    DD = table.Column<bool>(nullable: true),
                    Other = table.Column<string>(maxLength: 200, nullable: true),
                    PassengerCertificate = table.Column<bool>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CargoClassification", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CargoClas__IdCom__55BFB948",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HazardMaterialOptions",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCompany = table.Column<long>(nullable: true),
                    HRCQ = table.Column<bool>(nullable: true),
                    QuantityofDivision = table.Column<bool>(nullable: true),
                    TIH = table.Column<bool>(nullable: true),
                    Shipment = table.Column<bool>(nullable: true),
                    Hmsafety = table.Column<string>(maxLength: 8, nullable: true),
                    CFR = table.Column<string>(maxLength: 255, nullable: true),
                    CFR485 = table.Column<bool>(nullable: true),
                    ANYSTATES = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HazardMaterialOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK__HazardMat__IdCom__7FB5F314",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HazardMaterialStates",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCompany = table.Column<long>(nullable: true),
                    AK = table.Column<bool>(nullable: true),
                    AL = table.Column<bool>(nullable: true),
                    AR = table.Column<bool>(nullable: true),
                    AZ = table.Column<bool>(nullable: true),
                    CA = table.Column<bool>(nullable: true),
                    CO = table.Column<bool>(nullable: true),
                    CT = table.Column<bool>(nullable: true),
                    DC = table.Column<bool>(nullable: true),
                    DE = table.Column<bool>(nullable: true),
                    FL = table.Column<bool>(nullable: true),
                    GA = table.Column<bool>(nullable: true),
                    HI = table.Column<bool>(nullable: true),
                    IA = table.Column<bool>(nullable: true),
                    Idaho = table.Column<bool>(nullable: true),
                    IL = table.Column<bool>(nullable: true),
                    Indiana = table.Column<bool>(nullable: true),
                    KS = table.Column<bool>(nullable: true),
                    KY = table.Column<bool>(nullable: true),
                    LA = table.Column<bool>(nullable: true),
                    MA = table.Column<bool>(nullable: true),
                    MD = table.Column<bool>(nullable: true),
                    ME = table.Column<bool>(nullable: true),
                    MI = table.Column<bool>(nullable: true),
                    MN = table.Column<bool>(nullable: true),
                    MO = table.Column<bool>(nullable: true),
                    MS = table.Column<bool>(nullable: true),
                    MT = table.Column<bool>(nullable: true),
                    NC = table.Column<bool>(nullable: true),
                    ND = table.Column<bool>(nullable: true),
                    NE = table.Column<bool>(nullable: true),
                    NH = table.Column<bool>(nullable: true),
                    NJ = table.Column<bool>(nullable: true),
                    NM = table.Column<bool>(nullable: true),
                    NV = table.Column<bool>(nullable: true),
                    NY = table.Column<bool>(nullable: true),
                    OH = table.Column<bool>(nullable: true),
                    OK = table.Column<bool>(nullable: true),
                    Oregon = table.Column<bool>(nullable: true),
                    PA = table.Column<bool>(nullable: true),
                    PR = table.Column<bool>(nullable: true),
                    RI = table.Column<bool>(nullable: true),
                    SC = table.Column<bool>(nullable: true),
                    SD = table.Column<bool>(nullable: true),
                    TN = table.Column<bool>(nullable: true),
                    TX = table.Column<bool>(nullable: true),
                    UT = table.Column<bool>(nullable: true),
                    VA = table.Column<bool>(nullable: true),
                    VT = table.Column<bool>(nullable: true),
                    WA = table.Column<bool>(nullable: true),
                    WI = table.Column<bool>(nullable: true),
                    WV = table.Column<bool>(nullable: true),
                    WY = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HazardMaterialStates", x => x.Id);
                    table.ForeignKey(
                        name: "FK__HazardMat__IdCom__084B3915",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OperationClassification",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    A = table.Column<bool>(nullable: true),
                    B = table.Column<bool>(nullable: true),
                    C = table.Column<bool>(nullable: true),
                    D = table.Column<bool>(nullable: true),
                    E = table.Column<bool>(nullable: true),
                    F = table.Column<bool>(nullable: true),
                    G = table.Column<bool>(nullable: true),
                    H = table.Column<bool>(nullable: true),
                    I = table.Column<bool>(nullable: true),
                    J = table.Column<bool>(nullable: true),
                    K = table.Column<bool>(nullable: true),
                    L = table.Column<bool>(nullable: true),
                    Other = table.Column<string>(maxLength: 200, nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationClassification", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Operation__IdCom__53D770D6",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkOrder",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: false),
                    Type = table.Column<string>(maxLength: 20, nullable: false),
                    MileageTime = table.Column<string>(maxLength: 40, nullable: true),
                    DateNext = table.Column<DateTime>(type: "date", nullable: true),
                    MileageType = table.Column<string>(maxLength: 40, nullable: true),
                    InspectionDue = table.Column<string>(maxLength: 60, nullable: true),
                    AssignedTo = table.Column<string>(maxLength: 50, nullable: false),
                    Status = table.Column<string>(maxLength: 20, nullable: false),
                    ExternalServices = table.Column<bool>(nullable: true),
                    WorkRequest = table.Column<string>(maxLength: 200, nullable: true),
                    IdVehicle = table.Column<long>(nullable: false),
                    VehicleType = table.Column<string>(maxLength: 15, nullable: true),
                    IdCompany = table.Column<long>(nullable: false),
                    IssuedBy = table.Column<long>(nullable: false),
                    ServiceType = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK__WorkOrder__IdCom__7EF6D905",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccidentRegister",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCompany = table.Column<long>(nullable: true),
                    AccidentDate = table.Column<DateTime>(type: "date", nullable: false),
                    AccidentHour = table.Column<TimeSpan>(type: "time(0)", nullable: true),
                    Address = table.Column<string>(maxLength: 100, nullable: true),
                    IdState = table.Column<long>(nullable: true),
                    IdCity = table.Column<long>(nullable: true),
                    Fatalities = table.Column<int>(nullable: true),
                    Injuries = table.Column<int>(nullable: true),
                    Hm = table.Column<bool>(nullable: true),
                    IdDriver = table.Column<long>(nullable: true),
                    ReportNumber = table.Column<string>(maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccidentRegister", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AccidentR__IdCom__2B947552",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__AccidentR__IdDri__2E70E1FD",
                        column: x => x.IdDriver,
                        principalSchema: "DF",
                        principalTable: "Driver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployerPullNotice",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: false),
                    DriverLicense = table.Column<string>(maxLength: 15, nullable: false),
                    RecordDate = table.Column<DateTime>(type: "date", nullable: false),
                    RequesterCode = table.Column<string>(maxLength: 20, nullable: false),
                    Violations = table.Column<string>(maxLength: 35, nullable: false),
                    ReviewedBy = table.Column<string>(maxLength: 50, nullable: false),
                    DateReview = table.Column<DateTime>(type: "date", nullable: false),
                    FileName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployerPullNotice", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EmployerP__IdDri__370627FE",
                        column: x => x.IdDriver,
                        principalSchema: "DF",
                        principalTable: "Driver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoadTest",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdDriver = table.Column<long>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    DriverName = table.Column<string>(maxLength: 100, nullable: true),
                    Ssn = table.Column<string>(maxLength: 15, nullable: true),
                    License = table.Column<string>(maxLength: 12, nullable: true),
                    StateLicense = table.Column<string>(maxLength: 100, nullable: true),
                    TypeEquipment = table.Column<string>(maxLength: 200, nullable: true),
                    ClassEquipment = table.Column<string>(maxLength: 200, nullable: true),
                    TypeBus = table.Column<string>(maxLength: 200, nullable: true),
                    DateC = table.Column<DateTime>(type: "date", nullable: true),
                    CompanyName = table.Column<string>(maxLength: 200, nullable: true),
                    CompanyAddress = table.Column<string>(maxLength: 455, nullable: true),
                    Title = table.Column<string>(maxLength: 100, nullable: true),
                    FileSignatureDer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoadTest", x => x.Id);
                    table.ForeignKey(
                        name: "FK__RoadTest__idDriv__0A688BB1",
                        column: x => x.IdDriver,
                        principalSchema: "DF",
                        principalTable: "Driver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleDrugTest",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FederalTest = table.Column<bool>(nullable: true),
                    TestingAuthority = table.Column<string>(maxLength: 15, nullable: true),
                    IdDriver = table.Column<long>(nullable: true),
                    Performed = table.Column<string>(maxLength: 25, nullable: true),
                    Reason = table.Column<string>(maxLength: 30, nullable: true),
                    DateTimeTest = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateTimeExpiration = table.Column<DateTime>(type: "datetime", nullable: true),
                    Lab = table.Column<string>(maxLength: 50, nullable: true),
                    Provider = table.Column<string>(maxLength: 50, nullable: true),
                    Status = table.Column<string>(maxLength: 50, nullable: true),
                    StepProcessCode = table.Column<string>(maxLength: 50, nullable: true),
                    CancelDetails = table.Column<string>(maxLength: 15, nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleDrugTest", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ScheduleD__IdCom__4277DAAA",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__ScheduleD__Donor__4183B671",
                        column: x => x.IdDriver,
                        principalSchema: "DF",
                        principalTable: "Driver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "REAAddress",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdEmploymentAplication = table.Column<long>(nullable: true),
                    IdDAddress = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_REAAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REAAddres__idDAd__251C81ED",
                        column: x => x.IdDAddress,
                        principalSchema: "DF",
                        principalTable: "DriverAddress",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__REAAddres__idEAp__24285DB4",
                        column: x => x.IdEmploymentAplication,
                        principalSchema: "DF",
                        principalTable: "EmploymentApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "READExperience",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdEmploymentAplication = table.Column<long>(nullable: true),
                    IdDrivingExperience = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_READExperience", x => x.Id);
                    table.ForeignKey(
                        name: "FK__READExper__idDEx__214BF109",
                        column: x => x.IdDrivingExperience,
                        principalSchema: "DF",
                        principalTable: "DrivingExperience",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__READExper__idEAp__2057CCD0",
                        column: x => x.IdEmploymentAplication,
                        principalSchema: "DF",
                        principalTable: "EmploymentApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "REARAccident",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdEmploymentAplication = table.Column<long>(nullable: true),
                    IdDRAccident = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_REARAccident", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REARAccid__idDRA__28ED12D1",
                        column: x => x.IdDRAccident,
                        principalSchema: "DF",
                        principalTable: "AccidentRecord",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__REARAccid__idEAp__27F8EE98",
                        column: x => x.IdEmploymentAplication,
                        principalSchema: "DF",
                        principalTable: "EmploymentApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "REATConvictions",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdEAplication = table.Column<long>(nullable: true),
                    IdTrafficConvictions = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_REATConvictions", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REATConvi__idEAp__2BC97F7C",
                        column: x => x.IdEAplication,
                        principalSchema: "DF",
                        principalTable: "EmploymentApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__REATConvi__idTCo__2CBDA3B5",
                        column: x => x.IdTrafficConvictions,
                        principalSchema: "AC",
                        principalTable: "TrafficConvictions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "REAERecords",
                schema: "DF",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdEmploymentAplication = table.Column<long>(nullable: true),
                    IdEmploymentRecords = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_REAERecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REAERecor__idEAp__2F9A1060",
                        column: x => x.IdEmploymentAplication,
                        principalSchema: "DF",
                        principalTable: "EmploymentApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__REAERecor__idERe__308E3499",
                        column: x => x.IdEmploymentRecords,
                        principalSchema: "DF",
                        principalTable: "EmploymentRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HazardMaterialCompany",
                schema: "MCS150",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdHazardMaterial = table.Column<int>(nullable: false),
                    Carrier = table.Column<bool>(nullable: true),
                    Shipper = table.Column<bool>(nullable: true),
                    BulkHm = table.Column<bool>(nullable: true),
                    NonBulk = table.Column<bool>(nullable: true),
                    IdCompany = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HazardMaterialCompany", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HazardMaterialCompany_Company",
                        column: x => x.IdCompany,
                        principalSchema: "AC",
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HazardMaterialCompany_HazardMaterial",
                        column: x => x.IdHazardMaterial,
                        principalSchema: "MCS150",
                        principalTable: "HazardMaterial",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Material",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<string>(maxLength: 5, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Cost = table.Column<string>(maxLength: 20, nullable: true),
                    invoiceFile = table.Column<string>(maxLength: 50, nullable: false),
                    IdWorkOrder = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Material", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Material__IdWork__0B5CAFEA",
                        column: x => x.IdWorkOrder,
                        principalSchema: "MT",
                        principalTable: "WorkOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                schema: "MT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ServiceDue = table.Column<string>(maxLength: 60, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    DateWorkOrderClosed = table.Column<DateTime>(type: "date", nullable: true),
                    IdWorkOrder = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Service__IdWorkO__01D345B0",
                        column: x => x.IdWorkOrder,
                        principalSchema: "MT",
                        principalTable: "WorkOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyDocs",
                schema: "AC",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DocName = table.Column<string>(maxLength: 100, nullable: true),
                    IdCompany = table.Column<long>(nullable: true),
                    DescriptionDoc = table.Column<string>(maxLength: 100, nullable: true),
                    DocType = table.Column<string>(maxLength: 40, nullable: true),
                    IdAccidentRegister = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyDocs", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CompanyDo__IdAcc__2F650636",
                        column: x => x.IdAccidentRegister,
                        principalSchema: "AC",
                        principalTable: "AccidentRegister",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DrugTest",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SpecimenNumber = table.Column<string>(maxLength: 15, nullable: true),
                    ValidIdentification = table.Column<bool>(nullable: true),
                    RemarksIdentification = table.Column<string>(maxLength: 100, nullable: true),
                    ValidTemperature = table.Column<bool>(nullable: true),
                    TemperatureRemarks = table.Column<string>(maxLength: 100, nullable: true),
                    TypeCollection = table.Column<string>(maxLength: 15, nullable: true),
                    CollectionRemarks = table.Column<string>(maxLength: 100, nullable: true),
                    IssuesCollection = table.Column<string>(maxLength: 50, nullable: true),
                    IssuesCollectionRemarks = table.Column<string>(maxLength: 100, nullable: true),
                    ReleasedTo = table.Column<string>(maxLength: 50, nullable: true),
                    CollectorSignature = table.Column<string>(maxLength: 50, nullable: true),
                    DonorSignature = table.Column<string>(maxLength: 50, nullable: true),
                    DateTimeCollectionCollector = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateTimeCollectionDriver = table.Column<DateTime>(type: "datetime", nullable: true),
                    CollectorCertification = table.Column<bool>(nullable: true),
                    driverCertification = table.Column<bool>(nullable: true),
                    Status = table.Column<string>(maxLength: 50, nullable: true),
                    IdScheduleDrugTest = table.Column<long>(nullable: true),
                    IdDrugAlcoholCompliance = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugTest", x => x.Id);
                    table.ForeignKey(
                        name: "FK__DrugTest__IdDrug__1B29035F",
                        column: x => x.IdDrugAlcoholCompliance,
                        principalSchema: "DF",
                        principalTable: "DrugAlcoholCompliance",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__DrugTest__IdSche__1A34DF26",
                        column: x => x.IdScheduleDrugTest,
                        principalSchema: "DT",
                        principalTable: "ScheduleDrugTest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccidentRegister_IdCompany",
                schema: "AC",
                table: "AccidentRegister",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_AccidentRegister_IdDriver",
                schema: "AC",
                table: "AccidentRegister",
                column: "IdDriver");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyAlerts_IdCompany",
                schema: "AC",
                table: "CompanyAlerts",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyDocs_IdAccidentRegister",
                schema: "AC",
                table: "CompanyDocs",
                column: "IdAccidentRegister");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUsersRoles_IdCompany",
                schema: "AC",
                table: "CompanyUsersRoles",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_EmployerPullNotice_IdDriver",
                schema: "DF",
                table: "EmployerPullNotice",
                column: "IdDriver");

            migrationBuilder.CreateIndex(
                name: "IX_REAAddress_IdDAddress",
                schema: "DF",
                table: "REAAddress",
                column: "IdDAddress");

            migrationBuilder.CreateIndex(
                name: "IX_REAAddress_IdEmploymentAplication",
                schema: "DF",
                table: "REAAddress",
                column: "IdEmploymentAplication");

            migrationBuilder.CreateIndex(
                name: "IX_READExperience_IdDrivingExperience",
                schema: "DF",
                table: "READExperience",
                column: "IdDrivingExperience");

            migrationBuilder.CreateIndex(
                name: "IX_READExperience_IdEmploymentAplication",
                schema: "DF",
                table: "READExperience",
                column: "IdEmploymentAplication");

            migrationBuilder.CreateIndex(
                name: "IX_REAERecords_IdEmploymentAplication",
                schema: "DF",
                table: "REAERecords",
                column: "IdEmploymentAplication");

            migrationBuilder.CreateIndex(
                name: "IX_REAERecords_IdEmploymentRecords",
                schema: "DF",
                table: "REAERecords",
                column: "IdEmploymentRecords");

            migrationBuilder.CreateIndex(
                name: "IX_REARAccident_IdDRAccident",
                schema: "DF",
                table: "REARAccident",
                column: "IdDRAccident");

            migrationBuilder.CreateIndex(
                name: "IX_REARAccident_IdEmploymentAplication",
                schema: "DF",
                table: "REARAccident",
                column: "IdEmploymentAplication");

            migrationBuilder.CreateIndex(
                name: "IX_REATConvictions_IdEAplication",
                schema: "DF",
                table: "REATConvictions",
                column: "IdEAplication");

            migrationBuilder.CreateIndex(
                name: "IX_REATConvictions_IdTrafficConvictions",
                schema: "DF",
                table: "REATConvictions",
                column: "IdTrafficConvictions");

            migrationBuilder.CreateIndex(
                name: "IX_RoadTest_IdDriver",
                schema: "DF",
                table: "RoadTest",
                column: "IdDriver");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateEnrollment_IdCompany",
                schema: "DT",
                table: "CertificateEnrollment",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_DrugTest_IdDrugAlcoholCompliance",
                schema: "DT",
                table: "DrugTest",
                column: "IdDrugAlcoholCompliance");

            migrationBuilder.CreateIndex(
                name: "IX_DrugTest_IdScheduleDrugTest",
                schema: "DT",
                table: "DrugTest",
                column: "IdScheduleDrugTest");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleDrugTest_IdCompany",
                schema: "DT",
                table: "ScheduleDrugTest",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleDrugTest_IdDriver",
                schema: "DT",
                table: "ScheduleDrugTest",
                column: "IdDriver");

            migrationBuilder.CreateIndex(
                name: "IX_SupervisorTraining_IdCompany",
                schema: "DT",
                table: "SupervisorTraining",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_CargoClassification_IdCompany",
                schema: "MCS150",
                table: "CargoClassification",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_HazardMaterialCompany_IdCompany",
                schema: "MCS150",
                table: "HazardMaterialCompany",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_HazardMaterialCompany_IdHazardMaterial",
                schema: "MCS150",
                table: "HazardMaterialCompany",
                column: "IdHazardMaterial");

            migrationBuilder.CreateIndex(
                name: "IX_HazardMaterialOptions_IdCompany",
                schema: "MCS150",
                table: "HazardMaterialOptions",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_HazardMaterialStates_IdCompany",
                schema: "MCS150",
                table: "HazardMaterialStates",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_OperationClassification_IdCompany",
                schema: "MCS150",
                table: "OperationClassification",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "IX_Material_IdWorkOrder",
                schema: "MT",
                table: "Material",
                column: "IdWorkOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Service_IdWorkOrder",
                schema: "MT",
                table: "Service",
                column: "IdWorkOrder");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrder_IdCompany",
                schema: "MT",
                table: "WorkOrder",
                column: "IdCompany");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionElectrical");

            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionFuelSystem");

            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionSafe");

            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionSteeringMechanism");

            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionSuspension");

            migrationBuilder.DropTable(
                name: "MT.VehicleInspectionTires");

            migrationBuilder.DropTable(
                name: "City",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "CompanyAlerts",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "CompanyDocs",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "CompanyUsersRoles",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "Country",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "Crash",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "State",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "UsDot",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "AnnualDMVReview",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "AnnualDriversCertification",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "DMV",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "DriverAlerts",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "DriverDocs",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "EmployerPullNotice",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "EmploymentHistory",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "LetterInquiry",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "MedicalCertificate",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "REAAddress",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "READExperience",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "REAERecords",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "REARAccident",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "REATConvictions",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "RoadTest",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "CertificateEnrollment",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "CollectionSite",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "Collector",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "CollectorObservation",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "DrugTest",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "Provider",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "SupervisorTraining",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "CargoClassification",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "HazardMaterialCompany",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "HazardMaterialOptions",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "HazardMaterialStates",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "OperationClassification",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "Inspection",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "MaintenanceAlerts",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "MaintenanceDocs",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Material",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Service",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Trailer",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Vehicle",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "VehicleInspection",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "VehicleInspectionBrakes",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "VehicleInspectionHeating",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "VehicleInspectionMechanical",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "VehiculeInspectionBodyShop",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Violations",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "AccidentRegister",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "DriverAddress",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "DrivingExperience",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "EmploymentRecords",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "AccidentRecord",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "EmploymentApplication",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "TrafficConvictions",
                schema: "AC");

            migrationBuilder.DropTable(
                name: "DrugAlcoholCompliance",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "ScheduleDrugTest",
                schema: "DT");

            migrationBuilder.DropTable(
                name: "HazardMaterial",
                schema: "MCS150");

            migrationBuilder.DropTable(
                name: "WorkOrder",
                schema: "MT");

            migrationBuilder.DropTable(
                name: "Driver",
                schema: "DF");

            migrationBuilder.DropTable(
                name: "Company",
                schema: "AC");
        }
    }
}
