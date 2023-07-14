"use client"
import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import useStore from '@store/index'
import createClient from './createClient'

const useAuth = () => {

    const [session, setSession, setLoading] = useStore((s) => [s.session, s.setSession, s.setGlobalLoading])
    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])
    return session


}

export default useAuth