USE [StudentCareDB]
GO
/****** Object:  Table [dbo].[Certificates]    Script Date: 10/13/2023 11:15:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Certificates](
	[CertificatesID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [int] NOT NULL,
	[Kind] [nvarchar](50) NULL,
	[Commit] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_Certificates_1] PRIMARY KEY CLUSTERED 
(
	[CertificatesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inquiries]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inquiries](
	[InquiriesID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [int] NULL,
	[ProblemName] [nvarchar](max) NULL,
	[Detail] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_Inquiries] PRIMARY KEY CLUSTERED 
(
	[InquiriesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Login]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[ID] [int] NOT NULL,
	[RoleID] [int] NULL,
	[Password] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Problem]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Problem](
	[ProblemID] [int] NOT NULL,
	[ProblemName] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_Problem] PRIMARY KEY CLUSTERED 
(
	[ProblemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResultsAnswered]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResultsAnswered](
	[ResultsAnsweredID] [int] NOT NULL,
	[InquiriesID] [int] NULL,
	[StudentID] [int] NULL,
	[TeacherID] [int] NULL,
	[DateOfReception] [date] NULL,
	[ProcessingResults] [nvarchar](max) NULL,
	[Condition] [nvarchar](50) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_ResultsAnswered] PRIMARY KEY CLUSTERED 
(
	[ResultsAnsweredID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResultsCertification]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResultsCertification](
	[ResultsCertificationID] [int] NOT NULL,
	[CertificatesID] [int] NULL,
	[StudentID] [int] NULL,
	[TeacherID] [int] NULL,
	[DateOfReception] [date] NULL,
	[ProcessingResults] [nvarchar](max) NULL,
	[Condition] [nvarchar](50) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_ResultsCertification] PRIMARY KEY CLUSTERED 
(
	[ResultsCertificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [int] NOT NULL,
	[RoleName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentInformation]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentInformation](
	[StudentID] [int] NOT NULL,
	[StudentName] [nvarchar](50) NULL,
	[Birthday] [datetime2](0) NULL,
	[StudentClass] [varchar](20) NULL,
	[Course] [nvarchar](20) NULL,
	[FieldOfStudy] [nvarchar](50) NULL,
	[PhoneNumber] [varchar](20) NULL,
	[Email] [varchar](50) NULL,
	[PlaceOfBirth] [nvarchar](20) NULL,
	[PermanentResidence] [nvarchar](50) NULL,
	[YearOfStudy] [int] NULL,
	[Faculty] [nvarchar](20) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
	[RoleID] [int] NULL,
 CONSTRAINT [PK_StudentInformation_1] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeacherInformation]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeacherInformation](
	[TeacherID] [int] NOT NULL,
	[TeacherName] [nvarchar](50) NULL,
	[ProblemID] [int] NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
	[RoleID] [int] NULL,
 CONSTRAINT [PK_TeacherInformation_1] PRIMARY KEY CLUSTERED 
(
	[TeacherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkSchedule]    Script Date: 10/13/2023 11:15:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkSchedule](
	[WorkScheduleID] [int] NOT NULL,
	[TeacherID] [int] NOT NULL,
	[TeacherName] [nvarchar](50) NULL,
	[DaysOfWork] [date] NULL,
	[StartTime] [datetime2](0) NULL,
	[EndTime] [datetime2](0) NULL,
	[CreatedAt] [datetime2](0) NULL,
	[UpdatedAt] [datetime2](0) NULL,
 CONSTRAINT [PK_WorkSchedule] PRIMARY KEY CLUSTERED 
(
	[TeacherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Certificates] ON 

INSERT [dbo].[Certificates] ([CertificatesID], [StudentID], [Kind], [Commit], [CreatedAt], [UpdatedAt]) VALUES (8, 1234, N'BỔ SUNG HỒ SƠ', N'ĐÃ ĐỌC VÀ CAM KẾT', CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2))
INSERT [dbo].[Certificates] ([CertificatesID], [StudentID], [Kind], [Commit], [CreatedAt], [UpdatedAt]) VALUES (9, 12345, N'TẠM HOÃN NGHĨA VỤ QUÂN SỰ', N'ĐÃ ĐỌC VÀ CAM KẾT', CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Certificates] OFF
GO
SET IDENTITY_INSERT [dbo].[Inquiries] ON 

INSERT [dbo].[Inquiries] ([InquiriesID], [StudentID], [ProblemName], [Detail], [CreatedAt], [UpdatedAt]) VALUES (53, 1234, N'CẬP NHẬT ĐIỂM SỐ', N'cập nhật điểm môn csdl', CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2))
INSERT [dbo].[Inquiries] ([InquiriesID], [StudentID], [ProblemName], [Detail], [CreatedAt], [UpdatedAt]) VALUES (54, 12345, N'ĐĂNG KÝ HỌC LẠI-THI LẠI', N'đăng ký lại môn GDTC', CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Inquiries] OFF
GO
INSERT [dbo].[Login] ([ID], [RoleID], [Password], [CreatedAt], [UpdatedAt]) VALUES (1, 2, N'$2a$11$YcKU.OkGU8slwg.1uJQePuc0sU2vZCOpsv0GODeWt.prmrgOg5iDu', CAST(N'2023-10-04T09:57:29.0000000' AS DateTime2), CAST(N'2023-10-04T09:57:29.0000000' AS DateTime2))
INSERT [dbo].[Login] ([ID], [RoleID], [Password], [CreatedAt], [UpdatedAt]) VALUES (123, 1, N'$2a$11$wGKZ16Uz1ZHfKTqiO0xTcOfixbkiDfzIsCA6GVFg5jyBCWywuYWrK', CAST(N'2023-10-06T08:00:49.0000000' AS DateTime2), CAST(N'2023-10-06T08:00:49.0000000' AS DateTime2))
INSERT [dbo].[Login] ([ID], [RoleID], [Password], [CreatedAt], [UpdatedAt]) VALUES (1234, 3, N'$2a$11$7eKxHSU6KSthMTY5wSs9mutBA33gfOEW7XHI35IDzEXzhttzmxwVi', CAST(N'2023-10-06T08:09:58.0000000' AS DateTime2), CAST(N'2023-10-06T08:09:58.0000000' AS DateTime2))
INSERT [dbo].[Login] ([ID], [RoleID], [Password], [CreatedAt], [UpdatedAt]) VALUES (12345, 3, N'$2a$11$N8v3fGB/2XsQJHqlONb4fuMrcenkT.Bz6Qz/c1lhDSxt33vVkZ9cW', CAST(N'2023-10-06T08:10:57.0000000' AS DateTime2), CAST(N'2023-10-06T08:10:57.0000000' AS DateTime2))
GO
INSERT [dbo].[ResultsAnswered] ([ResultsAnsweredID], [InquiriesID], [StudentID], [TeacherID], [DateOfReception], [ProcessingResults], [Condition], [CreatedAt], [UpdatedAt]) VALUES (53, 53, 1234, 1, CAST(N'2023-10-06' AS Date), N'đã cập nhật', N'Confirmed', CAST(N'2023-10-06T08:13:34.0000000' AS DateTime2), CAST(N'2023-10-06T15:24:05.0000000' AS DateTime2))
INSERT [dbo].[ResultsAnswered] ([ResultsAnsweredID], [InquiriesID], [StudentID], [TeacherID], [DateOfReception], [ProcessingResults], [Condition], [CreatedAt], [UpdatedAt]) VALUES (54, 54, 12345, NULL, NULL, NULL, NULL, CAST(N'2023-10-06T08:27:43.0000000' AS DateTime2), CAST(N'2023-10-06T08:27:43.0000000' AS DateTime2))
GO
INSERT [dbo].[ResultsCertification] ([ResultsCertificationID], [CertificatesID], [StudentID], [TeacherID], [DateOfReception], [ProcessingResults], [Condition], [CreatedAt], [UpdatedAt]) VALUES (8, 8, 1234, NULL, NULL, NULL, NULL, CAST(N'2023-10-06T08:13:40.0000000' AS DateTime2), CAST(N'2023-10-06T08:13:40.0000000' AS DateTime2))
INSERT [dbo].[ResultsCertification] ([ResultsCertificationID], [CertificatesID], [StudentID], [TeacherID], [DateOfReception], [ProcessingResults], [Condition], [CreatedAt], [UpdatedAt]) VALUES (9, 9, 12345, 1, CAST(N'2023-10-06' AS Date), N'đã hoàn thành đơn', N'Confirmed', CAST(N'2023-10-06T08:28:50.0000000' AS DateTime2), CAST(N'2023-10-06T15:30:11.0000000' AS DateTime2))
GO
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (1, N'Admin')
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (2, N'Teacher')
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (3, N'Student')
GO
INSERT [dbo].[StudentInformation] ([StudentID], [StudentName], [Birthday], [StudentClass], [Course], [FieldOfStudy], [PhoneNumber], [Email], [PlaceOfBirth], [PermanentResidence], [YearOfStudy], [Faculty], [CreatedAt], [UpdatedAt], [RoleID]) VALUES (1234, N'quang', CAST(N'2023-10-06T08:04:35.0000000' AS DateTime2), N'string', N'string', N'string', N'string', N'string', N'string', N'string', 0, N'string', CAST(N'2023-10-06T15:04:35.0000000' AS DateTime2), CAST(N'2023-10-06T15:04:35.0000000' AS DateTime2), 3)
INSERT [dbo].[StudentInformation] ([StudentID], [StudentName], [Birthday], [StudentClass], [Course], [FieldOfStudy], [PhoneNumber], [Email], [PlaceOfBirth], [PermanentResidence], [YearOfStudy], [Faculty], [CreatedAt], [UpdatedAt], [RoleID]) VALUES (12345, N'Tan', CAST(N'2023-10-02T00:00:00.0000000' AS DateTime2), N'14', N'Khóa 14', N'Quản trị Kinh Doanh', N'123654789', N'admin@gmail.com', N'string', N'string', 3, N'Ngoại Ngữ', CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), CAST(N'0001-01-01T07:00:00.0000000' AS DateTime2), 3)
GO
INSERT [dbo].[TeacherInformation] ([TeacherID], [TeacherName], [ProblemID], [CreatedAt], [UpdatedAt], [RoleID]) VALUES (1, N'quang', 1, CAST(N'2023-10-04T16:56:47.0000000' AS DateTime2), CAST(N'2023-10-04T16:56:47.0000000' AS DateTime2), 2)
INSERT [dbo].[TeacherInformation] ([TeacherID], [TeacherName], [ProblemID], [CreatedAt], [UpdatedAt], [RoleID]) VALUES (123, N'admin', 1, CAST(N'2023-10-06T15:00:13.0000000' AS DateTime2), CAST(N'2023-10-06T15:00:13.0000000' AS DateTime2), 1)
GO
ALTER TABLE [dbo].[Certificates]  WITH CHECK ADD  CONSTRAINT [FK_Certificates_StudentInformation] FOREIGN KEY([StudentID])
REFERENCES [dbo].[StudentInformation] ([StudentID])
GO
ALTER TABLE [dbo].[Certificates] CHECK CONSTRAINT [FK_Certificates_StudentInformation]
GO
ALTER TABLE [dbo].[Inquiries]  WITH CHECK ADD  CONSTRAINT [FK_Inquiries_StudentInformation] FOREIGN KEY([StudentID])
REFERENCES [dbo].[StudentInformation] ([StudentID])
GO
ALTER TABLE [dbo].[Inquiries] CHECK CONSTRAINT [FK_Inquiries_StudentInformation]
GO
ALTER TABLE [dbo].[Login]  WITH CHECK ADD  CONSTRAINT [FK_Login_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[Login] CHECK CONSTRAINT [FK_Login_Role]
GO
ALTER TABLE [dbo].[ResultsAnswered]  WITH CHECK ADD  CONSTRAINT [FK_ResultsAnswered_Inquiries] FOREIGN KEY([InquiriesID])
REFERENCES [dbo].[Inquiries] ([InquiriesID])
GO
ALTER TABLE [dbo].[ResultsAnswered] CHECK CONSTRAINT [FK_ResultsAnswered_Inquiries]
GO
ALTER TABLE [dbo].[ResultsAnswered]  WITH CHECK ADD  CONSTRAINT [FK_ResultsAnswered_StudentInformation] FOREIGN KEY([StudentID])
REFERENCES [dbo].[StudentInformation] ([StudentID])
GO
ALTER TABLE [dbo].[ResultsAnswered] CHECK CONSTRAINT [FK_ResultsAnswered_StudentInformation]
GO
ALTER TABLE [dbo].[ResultsAnswered]  WITH CHECK ADD  CONSTRAINT [FK_ResultsAnswered_TeacherInformation] FOREIGN KEY([TeacherID])
REFERENCES [dbo].[TeacherInformation] ([TeacherID])
GO
ALTER TABLE [dbo].[ResultsAnswered] CHECK CONSTRAINT [FK_ResultsAnswered_TeacherInformation]
GO
ALTER TABLE [dbo].[ResultsCertification]  WITH CHECK ADD  CONSTRAINT [FK_ResultsCertification_StudentInformation] FOREIGN KEY([StudentID])
REFERENCES [dbo].[StudentInformation] ([StudentID])
GO
ALTER TABLE [dbo].[ResultsCertification] CHECK CONSTRAINT [FK_ResultsCertification_StudentInformation]
GO
ALTER TABLE [dbo].[ResultsCertification]  WITH CHECK ADD  CONSTRAINT [FK_ResultsCertification_TeacherInformation] FOREIGN KEY([TeacherID])
REFERENCES [dbo].[TeacherInformation] ([TeacherID])
GO
ALTER TABLE [dbo].[ResultsCertification] CHECK CONSTRAINT [FK_ResultsCertification_TeacherInformation]
GO
ALTER TABLE [dbo].[StudentInformation]  WITH CHECK ADD  CONSTRAINT [FK_StudentInformation_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[StudentInformation] CHECK CONSTRAINT [FK_StudentInformation_Role]
GO
ALTER TABLE [dbo].[TeacherInformation]  WITH CHECK ADD  CONSTRAINT [FK_TeacherInformation_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[TeacherInformation] CHECK CONSTRAINT [FK_TeacherInformation_Role]
GO
ALTER TABLE [dbo].[WorkSchedule]  WITH CHECK ADD  CONSTRAINT [FK_WorkSchedule_TeacherInformation] FOREIGN KEY([TeacherID])
REFERENCES [dbo].[TeacherInformation] ([TeacherID])
GO
ALTER TABLE [dbo].[WorkSchedule] CHECK CONSTRAINT [FK_WorkSchedule_TeacherInformation]
GO
