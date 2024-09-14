/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	ClassLogs = "class_logs",
	Packages = "packages",
	StudentPackages = "student_packages",
	Students = "students",
	TeacherPackages = "teacher_packages",
	Teachers = "teachers",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ClassLogsRecord = {
	class_mins?: number
	finish_at?: IsoDateString
	finished?: boolean
	memo?: string
	start_at?: IsoDateString
	started?: boolean
	student: RecordIdString
	students_price?: number
	teacher: RecordIdString
	teachers_price?: number
	topic?: string
}

export type PackagesRecord = {
	class_mins: number
	name: string
	students_price: number
	teachers_price: number
}

export type StudentPackagesRecord = {
	package: RecordIdString
	price: number
	student: RecordIdString
}

export type StudentsRecord = {
	class_link?: string
	mobile?: string
	teacher: RecordIdString
	user: RecordIdString
	utc?: number
	whatsapp_no: string
}

export type TeacherPackagesRecord = {
	package: RecordIdString
	price: number
	teacher: RecordIdString
}

export type TeachersRecord = {
	email?: string
	mobile: string
	user: RecordIdString
	utc?: number
	whatsapp_no: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ClassLogsResponse<Texpand = unknown> = Required<ClassLogsRecord> & BaseSystemFields<Texpand>
export type PackagesResponse<Texpand = unknown> = Required<PackagesRecord> & BaseSystemFields<Texpand>
export type StudentPackagesResponse<Texpand = unknown> = Required<StudentPackagesRecord> & BaseSystemFields<Texpand>
export type StudentsResponse<Texpand = unknown> = Required<StudentsRecord> & BaseSystemFields<Texpand>
export type TeacherPackagesResponse<Texpand = unknown> = Required<TeacherPackagesRecord> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	class_logs: ClassLogsRecord
	packages: PackagesRecord
	student_packages: StudentPackagesRecord
	students: StudentsRecord
	teacher_packages: TeacherPackagesRecord
	teachers: TeachersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	class_logs: ClassLogsResponse
	packages: PackagesResponse
	student_packages: StudentPackagesResponse
	students: StudentsResponse
	teacher_packages: TeacherPackagesResponse
	teachers: TeachersResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'class_logs'): RecordService<ClassLogsResponse>
	collection(idOrName: 'packages'): RecordService<PackagesResponse>
	collection(idOrName: 'student_packages'): RecordService<StudentPackagesResponse>
	collection(idOrName: 'students'): RecordService<StudentsResponse>
	collection(idOrName: 'teacher_packages'): RecordService<TeacherPackagesResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
