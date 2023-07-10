"use client"
import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import useStore from '@store/index'
import createClient from './createClient'

const useAuth = () => {

    const [session, setSession] = useStore((s) => [s.session, s.setSession])

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])
    return session


}

export default useAuth